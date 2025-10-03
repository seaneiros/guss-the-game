import {
  Injectable,
  ExecutionContext }             from '@nestjs/common';
import { Reflector }             from '@nestjs/core';
import { AuthGuard }             from '@nestjs/passport';
import { PUBLIC_METADATA_FIELD } from '../decorators/public-meta.decorator';
// import type { UserData }         from '../types';
import type { Nullable }         from '@guss/common';


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super();
  }

  private hasPublicFlag(ctx: ExecutionContext) {
    return !!this.reflector.getAllAndOverride<boolean>(PUBLIC_METADATA_FIELD, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    if (this.hasPublicFlag(context)) {
      try {
        await super.canActivate(context) as unknown as Promise<boolean>;
        // const request = context.switchToHttp().getRequest<{ user: Nullable<UserData> }>();
        // this.handleRequest(null, request.user || null, null, context);
        return true;
      } catch {
        return true;
      }
    }

    return await super.canActivate(context) as unknown as Promise<boolean>;
  }

  handleRequest<UserData>(err: any, user: Nullable<UserData>, info: any, context: ExecutionContext, status?: any) {
    if (this.hasPublicFlag(context)) {
      return user;
    }

    return super.handleRequest<UserData>(err, user, info, context, status);
  }
}