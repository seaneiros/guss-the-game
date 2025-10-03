import {
  HttpException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnprocessableEntityException}   from '@nestjs/common';
import { InjectRepository }       from '@nestjs/typeorm';
import { ConfigService }          from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';

import { GameEntity }             from './entities/game.entity';
import { GameStatisticEntity }    from './entities/game-stats.entity';
import { add }                    from 'date-fns/add';
import {
  UUID,
  Result,
  IScoring,
  toUtcString,
  GameData,
  GameStatistics,
  GamesListResponse,
  GameDetailsResponse }           from '@guss/common';


@Injectable()
export class GamesService {

  constructor(
    @InjectRepository(GameEntity) private gamesRepository: Repository<GameEntity>,
    @InjectRepository(GameStatisticEntity) private statsRepository: Repository<GameStatisticEntity>,
    private dataSource: DataSource,
    private config: ConfigService,
  ) {}

  private prepareGameData = (entity: GameEntity): GameData => {
    const { id, createdAt, finishDate, startDate } = entity;

    return {
      id,
      createdAt: toUtcString(createdAt),
      startedAt: toUtcString(startDate),
      finishedAt: toUtcString(finishDate),
    };
  }

  private isPostgresError(error: unknown): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error;
  };

  async startNewGame(): Promise<Result<UUID, HttpException>> {
    const cooldownDuration = parseInt(this.config.get('COOLDOWN_DURATION_SECONDS') ?? '');
    const roundDuration = parseInt(this.config.get('ROUND_DURATION_SECONDS') ?? '');

    if (cooldownDuration < 0 || isNaN(cooldownDuration) || roundDuration < 0 || isNaN(roundDuration)) {
      return Result.Error(new BadRequestException('Configured durations are invalid'));
    }

    const creationDate = new Date();
    const startDate = add(creationDate, { seconds: cooldownDuration });
    const finishDate = add(startDate, { seconds: roundDuration });

    const newGameEntity = this.gamesRepository.create({
      createdAt: creationDate,
      startDate,
      finishDate,
    });

    try {
      const { identifiers } = await this.gamesRepository.insert(newGameEntity);

      return Result.Ok(identifiers[0]['id'] as UUID);
    } catch (err) {
      return Result.Error(new InternalServerErrorException((err as Error).message));
    }
  }

  async getGameDetails(gameId: UUID, userId: UUID): Promise<Result<GameDetailsResponse, HttpException>> {
    try {
      const rankedStatsQuery = this.statsRepository
        .createQueryBuilder('stats')
        .select('stats.user_id', 'user_id')
        .addSelect('stats.tap_count', 'tap_count')
        .addSelect('stats.points', 'points')
        .addSelect('u.name', 'name')
        .addSelect('sum(stats.points) over (partition by stats.game_id) :: integer', 'total')
        .addSelect('rank() over (partition by stats.game_id  order by stats.points desc, stats.tap_count desc, u.name, u.id)', 'rank')
        .leftJoin("users", 'u', 'stats.user_id = u.id')
        .where('stats.game_id = :gameId', { gameId })
        .getQuery();

      type StatisticsRow = {
        user_id: UUID;
        name: string;
        points: number;
        tap_count: number;
        total: number;
        isWinner: boolean;
      };

      const statisticsQuery = this.dataSource.createQueryBuilder()
        .select(['user_id', 'name', 'points', 'tap_count', 'total'])
        .addSelect('case when st.rank = 1 then true else false end', 'isWinner')
        .from(`(${rankedStatsQuery})`, 'st')
        .where('st.rank = 1 or st.user_id = :userId', { userId, gameId });

      const [ gameEntity, statisticsRaw ] = await Promise.all([
        this.gamesRepository.findOneBy({ id: gameId }),
        statisticsQuery.getRawMany<StatisticsRow>(),
      ]);

      if (!gameEntity) {
        return Result.Error(new NotFoundException('Game not found'));
      }

      const statistics: GameStatistics = {
        score: 0,
        tapsCount: 0,
        totalScore: 0,
        winner: null,
      };

      statisticsRaw.forEach(row => {
        const { user_id, name, points, tap_count, total, isWinner } = row;

        if (user_id === userId) {
          statistics.score = points;
          statistics.tapsCount = tap_count;
        }

        statistics.totalScore = total;

        if (isWinner) {
          statistics.winner = {
            user: {
              id: user_id,
              name,
            },
            score: points,
          };
        }
      });

      return Result.Ok({
        ...this.prepareGameData(gameEntity),
        statistics,
      });
    } catch (err) {
      const exceptionClass = this.isPostgresError(err) && err.code === '22P02' ? BadRequestException : InternalServerErrorException;

      return Result.Error(new exceptionClass((err as Error).message));
    }
  }

  async getGamesList(): Promise<Result<GamesListResponse, HttpException>> {
    try {
      const [ games, count ] = await this.gamesRepository.findAndCount({
        order: {
          startDate: 'DESC',
        }
      });

      return Result.Ok({
        count,
        items: games.map(this.prepareGameData)
      });
    } catch (err) {
      return Result.Error(new InternalServerErrorException((err as Error).message));
    }
  }

  async incrementGameScore(gameId: UUID, userId: UUID, scoreCalculator: IScoring): Promise<Result<number, HttpException>> {
    try {
      const gameQuery = this.gamesRepository
        .createQueryBuilder('g')
        .where('g.id = :gameId', { gameId })
        .andWhere(':now BETWEEN g.start_date AND g.finish_date', { now: new Date() });

      const canChangeScore = await gameQuery.getExists();

      if (!canChangeScore) {
        return Result.Error(new UnprocessableEntityException('Game is inactive or does not exist'));
      }

      const points = await this.dataSource.transaction(async entityManager => {
        const tapQuery = entityManager
          .createQueryBuilder()
          .insert()
          .into(GameStatisticEntity)
          .values({
            gameId,
            userId,
            points: 0,
            tapCount: 0,
          })
          .onConflict('(game_id, user_id) DO UPDATE SET tap_count = statistics.tap_count + 1');

        const { generatedMaps } = await tapQuery.execute();
        const statsId = generatedMaps[0]['id'] as UUID;
        const taps = generatedMaps[0]['tapCount'] as number;

        const pointsQuery = entityManager
          .createQueryBuilder()
          .update(GameStatisticEntity)
          .set({
            points: scoreCalculator.calculate(taps),
          })
          .where('id = :statsId', { statsId })
          .returning(['points']);

        const { raw } = await pointsQuery.execute();
        const points = raw[0]['points'] as number;

        return points;
      });


      return Result.Ok(points);
    } catch (err) {
      const exceptionClass = this.isPostgresError(err) && err.code === '22P02' ? BadRequestException : InternalServerErrorException;

      return Result.Error(new exceptionClass((err as Error).message));
    }
  }
}
