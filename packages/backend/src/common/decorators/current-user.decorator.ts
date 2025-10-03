import {
  ExecutionContext,
  createParamDecorator } from '@nestjs/common';
import { UserData }      from '../types';
import { Nullable }      from '@guss/common';


export const CurrentUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: Nullable<UserData> }>();

  return request.user;
});