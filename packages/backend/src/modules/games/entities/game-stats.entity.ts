import {
  Index,
  Entity,
  Column,
  PrimaryGeneratedColumn } from 'typeorm';
import type { UUID }       from '@guss/common';


@Entity({ name: 'statistics' })
@Index('idx_statistics_game_user', [ 'gameId', 'userId' ], { unique: true })
export class GameStatisticEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ name: 'game_id', type: 'uuid' })
  gameId: UUID;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: UUID;

  @Column({ name: 'tap_count', type: 'int', default: 0 })
  tapCount: number;

  @Column({ name: 'points', type: 'int', default: 0 })
  points: number;

  constructor(
    id: UUID,
    gameId: UUID,
    userId: UUID,
    tapCount: number,
    points: number,
  ) {
    this.id = id;
    this.gameId = gameId;
    this.userId = userId;
    this.tapCount = tapCount;
    this.points = points;
  }
}