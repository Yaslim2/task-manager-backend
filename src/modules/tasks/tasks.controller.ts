import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from 'src/entities/tasks.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { RequestWithUser } from 'src/shared/types/request-type';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req: RequestWithUser,
  ): Promise<Task> {
    return this.tasksService.createTask(req.user.sub, createTaskDto);
  }

  @Get()
  async findAll(
    @Request() req: RequestWithUser,
    @Query('status') status?: TaskStatus,
    @Query('title') title?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.tasksService.getTasks(req.user.sub, status, title, page, limit);
  }

  @Put(':id')
  async update(
    @Param('id') taskId: number,
    @Body()
    updateTaskDto: UpdateTaskDto,
    @Request() req: RequestWithUser,
  ): Promise<Task> {
    return this.tasksService.updateTask(taskId, req.user.sub, updateTaskDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') taskId: number,
    @Request() req: RequestWithUser,
  ): Promise<void> {
    return this.tasksService.deleteTask(taskId, req.user.sub);
  }
}
