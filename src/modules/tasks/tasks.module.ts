import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks.entity';
import { CacheRedisModule } from 'src/redis/redis-cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CacheRedisModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TypeOrmModule],
})
export class TasksModule {}
