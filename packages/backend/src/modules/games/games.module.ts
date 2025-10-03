import { TypeOrmModule }       from '@nestjs/typeorm';
import { GamesController }     from './games.controller';
import { GamesService }        from './games.service';
import { ConfigModule }        from '@nestjs/config';

import { Module }              from '@nestjs/common';
import { GameEntity }          from './entities/game.entity';
import { GameStatisticEntity } from './entities/game-stats.entity';


@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ GameEntity, GameStatisticEntity ])
  ],
  controllers: [
    GamesController,
  ],
  providers: [
    GamesService,
  ],
})
export class GamesModule { }
