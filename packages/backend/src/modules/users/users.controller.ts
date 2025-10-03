import {
  Get,
  Controller }                 from '@nestjs/common';
import { CurrentUser }         from 'src/common/decorators/current-user.decorator';
import type { UserData }       from 'src/common/types';
import { UserProfileResponse } from '@guss/common';
import { UsersService }        from './users.service';


@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get('me')
  async getProfile(@CurrentUser() currentUser: UserData): Promise<UserProfileResponse> {
    const result = await this.usersService.find({ id: currentUser.id });

    const { id, name, role } = result.unwrap();

    return {
      id,
      name,
      role,
    };
  }
}
