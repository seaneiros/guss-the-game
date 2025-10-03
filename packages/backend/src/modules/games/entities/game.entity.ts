import {
  Entity,
  Column,
  PrimaryGeneratedColumn } from 'typeorm';
import type { UUID }       from '@guss/common';


@Entity({ name: 'games' })
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ name: 'created_at', type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'finish_date', type: 'timestamp' })
  finishDate: Date;

  constructor(
    id: UUID,
    createdAt: Date,
    startDate: Date,
    finishDate: Date,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.startDate = startDate;
    this.finishDate = finishDate;
  }
}