import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from './entities/tasks.entity';
import { User } from './entities/users.entity';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksController } from './modules/tasks/tasks.controller';
import { AuthController } from './modules/auth/auth.controller';
import { TasksService } from './modules/tasks/tasks.service';
import { UsersService } from './modules/users/users.service';
import { AuthService } from './modules/auth/auth.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CacheRedisModule } from './modules/redis/redis-cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Task, User],
        synchronize: true,
      }),
    }),
    RedisModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    TasksModule,
    UsersModule,
    AuthModule,
    CacheRedisModule,
  ],
  controllers: [AppController, TasksController, AuthController],
  providers: [AppService, TasksService, UsersService, AuthService],
})
export class AppModule {}
