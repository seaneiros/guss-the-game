import { Module }         from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './jwt.strategy';
import {
  ConfigModule,
  ConfigService }         from '@nestjs/config';
import { UserModule }     from '../users/users.module';


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [
        ConfigModule,
      ],
      inject: [
        ConfigService,
      ],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_TTL') },
      }),
    }),
    ConfigModule,
    UserModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  controllers: [ AuthController ],
  exports: [ AuthService ],
})
export class AuthModule {}