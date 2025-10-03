
import {
  Injectable,
  NotFoundException }       from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository }       from 'typeorm';
import { Role, UUID }       from '@guss/common';
import { Result }           from '@guss/common';
import { UserEntity }       from './entities/user.entity';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
  ) {}

  async find(criteria: IUserCriteria): Promise<Result<UserEntity, NotFoundException>> {
    const { id, name, role } = criteria;

    const entity = await this.usersRepository.findOneBy({ id, name, role });

    return entity
      ? Result.Ok(entity)
      : Result.Error(new NotFoundException('User not found'));
  }

  generateEntity(name?: string) {
    return this.usersRepository.create({ name });
  }

  async create(user: UserEntity): Promise<Result<UUID, Error>> {
    try {
      const { identifiers } = await this.usersRepository.insert(user);

      return Result.Ok(identifiers[0]['id'] as UUID);
    } catch (err) {
      return Result.Error(err as Error);
    }
  }
}


/* HELPERS */

interface IUserCriteria {
  id?: UUID;
  name?: string;
  role?: Role;
}
