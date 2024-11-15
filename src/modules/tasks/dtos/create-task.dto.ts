import { IsString, IsEnum, MaxLength, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/entities/tasks.entity'; // Importando os status da tarefa

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus = TaskStatus.PENDING;
}
