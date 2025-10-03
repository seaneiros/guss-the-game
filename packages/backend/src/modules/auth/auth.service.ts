import {
  BadRequestException,
  HttpException,
  Injectable,
  UnprocessableEntityException } from '@nestjs/common';
import { JwtService }            from '@nestjs/jwt';
import * as bcrypt               from 'bcrypt';

import { Role, Result }          from '@guss/common';
import { UsersService }          from '../users/users.service';


@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private async createPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(2);

    return await bcrypt.hash(password, salt);
  }

  private async comparePassword(rawPassword: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, passwordHash);
  }

  async authorize(name: string, password: string): Promise<Result<string, HttpException>> {
    const userResult = await this.userService.find({ name });

    return new Promise(resolve => userResult.match({
      ok: async userEntity => {
        if (!await this.comparePassword(password, userEntity.passwordHash)) {
          return resolve(Result.Error(new UnprocessableEntityException('Invalid credentials')));
        }

        const token = this.jwtService.sign({ userId: userEntity.id, role: userEntity.role });

        resolve(Result.Ok(token));
      },
      error: async () => {
        const newUserEntity = this.userService.generateEntity(name);
        const role = defineUserRole(name);

        newUserEntity.passwordHash = await this.createPasswordHash(password);
        newUserEntity.role = role;

        const userCreationResult = await this.userService.create(newUserEntity);

        try {
          const userId = userCreationResult.unwrap();
          const token = this.jwtService.sign({ userId, role });

          resolve(Result.Ok(token));
        } catch (err) {
          resolve(Result.Error(new BadRequestException((err as Error).message)));
        }
      },
    }));
  }
}


/* HELPERS */

function defineUserRole(name: string) {
  const _name = name.toLowerCase();

  switch(_name) {
    case 'admin': return Role.Admin;
    case 'никита': return Role.PhantomUser;
    default: return Role.User;
  }
}