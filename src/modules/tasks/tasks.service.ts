// src/modules/tasks/tasks.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from 'src/entities/tasks.entity';
import { RedisCacheRepository } from 'src/modules/redis/redis-cache-repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly redisCacheRepository: RedisCacheRepository,
  ) {}

  async createTask(
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.save({ ...createTaskDto, userId });

    await this.invalidateUserTasksCache(userId);

    return task;
  }

  async getTasks(
    userId: number,
    status?: string,
    title?: string,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const cacheKey = `tasks_list:${userId}:${status ?? 'all'}:${title ?? 'all'}:${page}:${pageSize}`;
    const cachedData = await this.redisCacheRepository.getData(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const queryBuilder = this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId });

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (title) {
      queryBuilder.andWhere('task.title ILIKE :title', { title: `%${title}%` });
    }

    const [tasks, totalTasks] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const totalPages = Math.ceil(totalTasks / pageSize);
    const result = { tasks, totalTasks, totalPages, currentPage: page };

    await this.redisCacheRepository.saveData(result, cacheKey);

    return result;
  }

  async updateTask(
    id: number,
    userId: number,
    updateData: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new Error('Task not found for the provided user');
    }

    Object.assign(task, updateData);
    const updatedTask = await this.taskRepository.save(task);

    await this.invalidateUserTasksCache(userId);
    return updatedTask;
  }

  async deleteTask(id: number, userId: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id, userId } });
    if (!task) {
      throw new Error('Task not found');
    }

    await this.taskRepository.delete(id);

    await this.invalidateUserTasksCache(userId);
  }

  private async invalidateUserTasksCache(userId: number) {
    const cacheKeys = await this.redisCacheRepository.getKeys(
      `tasks_list:${userId}:*`,
    );

    await Promise.all(
      cacheKeys.map((key) => this.redisCacheRepository.del(key)),
    );
  }
}
