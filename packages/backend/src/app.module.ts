import { GamesModule } from './modules/games/games.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';


@Module({
  imports: [
    GamesModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      inject: [
        ConfigService,
      ],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('PG_APP_HOST'),
        port: Number(config.get('PG_APP_PORT')),
        username: config.get('PG_APP_USER'),
        password: config.get('PG_APP_PASSWORD'),
        database: config.get('PG_APP_DB'),
        schema: config.get('PG_APP_SCHEMA'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
