import {
  Body,
  Post,
  Controller,
  HttpCode,
  HttpStatus,
  ForbiddenException,
}                                         from '@nestjs/common';
import { AuthService }                    from './auth.service';
import { Public }                         from 'src/common/decorators/public-meta.decorator';
import { ParseNonEmptyTrimmedStringPipe } from 'src/common/pipes/ParseNonEmptyTrimmedStringPipe';
import { CurrentUser }                    from 'src/common/decorators/current-user.decorator';
import type { UserData }                  from 'src/common/types';
import type {
  Nullable,
  AuthorizationResponse }                 from '@guss/common';


@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {}

  @Post('sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  async signIn(
    @CurrentUser() currentUser: Nullable<UserData>,
    @Body('name', new ParseNonEmptyTrimmedStringPipe()) name: string,
    @Body('password', new ParseNonEmptyTrimmedStringPipe()) password: string,
  ): Promise<AuthorizationResponse> {
    if (currentUser) {
      throw new ForbiddenException('Already authorized');
    }

    const authResult = await this.authService.authorize(name, password);

    return {
      access_token: authResult.unwrap(),
    };
  }
}