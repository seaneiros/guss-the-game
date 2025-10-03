import type { UUID }         from '@guss/common';
import { isAfter, isBefore } from 'date-fns';
import { GameStatus }        from '../enums';


export class GameDetails {
  constructor(
    readonly id: UUID,
    readonly creationDate: Date,
    readonly startDate: Date,
    readonly finishDate: Date,
  ) {}

  get status(): GameStatus {
    const now = new Date();

    switch(true) {
      case isBefore(now, this.startDate): return GameStatus.Cooldown;
      case (isBefore(now, this.finishDate) && isAfter(now, this.startDate)): return GameStatus.Active;
      case isAfter(now, this.finishDate): return GameStatus.Completed;
    }

    return GameStatus.Cooldown;
  }
}