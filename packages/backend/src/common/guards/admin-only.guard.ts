import { Nullable, Role } from '@guss/common';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException}     from '@nestjs/common';
import { Observable }     from 'rxjs';
import type { UserData }  from '../types';


@Injectable()
export class AdminOnlyGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest<{ user: Nullable<UserData> }>();

    if (user?.role !== Role.Admin) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}