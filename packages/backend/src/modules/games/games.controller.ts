import {
  Get,
  Post,
  Param,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus }            from '@nestjs/common';
import { GamesService }   from './games.service';
import { AdminOnlyGuard } from 'src/common/guards/admin-only.guard';
import {
  GameTapResponse,
  GamesListResponse,
  GameDetailsResponse,
  createScoreCalculator } from '@guss/common';
import type { UUID }      from '@guss/common';
import { CurrentUser }    from 'src/common/decorators/current-user.decorator';
import type { UserData }  from 'src/common/types';


@Controller('games')
export class GamesController {

  constructor(
    private gamesService: GamesService
  ) {}

  @Get()
  async getGamesList(): Promise<GamesListResponse> {
    const result = await this.gamesService.getGamesList();

    return result.unwrap();
  }

  @Post()
  @UseGuards(AdminOnlyGuard)
  @HttpCode(HttpStatus.CREATED)
  async startNewGame() {
    const result = await this.gamesService.startNewGame();

    return { id: result.unwrap() };
  }

  @Get(':id')
  async getGameDetails(
    @Param('id') id: UUID,
    @CurrentUser() currentUser: UserData,
  ): Promise<GameDetailsResponse> {
    const result = await this.gamesService.getGameDetails(id, currentUser.id);

    return result.unwrap();
  }

  @Post(':id/action')
  @HttpCode(HttpStatus.CREATED)
  async registerGameAction(
    @Param('id') id: UUID,
    @CurrentUser() currentUser: UserData,
  ): Promise<GameTapResponse> {
    const result = await this.gamesService.incrementGameScore(id, currentUser.id, createScoreCalculator(currentUser.role));

    return { score: result.unwrap() };
  }
}
