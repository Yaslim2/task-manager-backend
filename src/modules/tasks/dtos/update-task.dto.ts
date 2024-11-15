import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { TaskStatus } from 'src/entities/tasks.entity';

export class UpdateTaskDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
