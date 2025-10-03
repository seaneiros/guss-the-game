import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn } from 'typeorm';
import { Role, UUID }      from '@guss/common';


@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  constructor(
    id: UUID,
    name: string,
    role: Role,
    passwordHash: string,
  ) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.passwordHash = passwordHash;
  }
}