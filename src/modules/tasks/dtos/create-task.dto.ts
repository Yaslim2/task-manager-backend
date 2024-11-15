import {
  IsString,
  IsEnum,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { TaskStatus } from 'src/entities/tasks.entity'; // Importando os status da tarefa

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.PENDING;
}
