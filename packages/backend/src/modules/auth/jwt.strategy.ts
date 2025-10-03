import {
  Strategy,
  ExtractJwt }              from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable }       from '@nestjs/common';
import { ConfigService }    from '@nestjs/config';
import { JwtPayload }       from './types';
import { UserData }         from 'src/common/types';
import { Nullable }         from '@guss/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET')!,
    });
  }

  validate(payload: JwtPayload): Nullable<UserData> {
    const { userId: id, role } = payload;

    return { id, role };
  }
}