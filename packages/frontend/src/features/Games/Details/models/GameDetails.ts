import type { Nullable, UUID } from '@guss/common';


export class GameStats {

  constructor(
    readonly totalScore: number,
    readonly score: number,
    readonly tapsCount: number,
    readonly winner: Nullable<Winner>,
  ) {}
}

export class Winner {

  constructor(
    readonly id: UUID,
    readonly name: string,
    readonly score: number,
  ) {}
}