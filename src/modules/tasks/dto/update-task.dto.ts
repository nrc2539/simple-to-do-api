import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.enum';

export class UpdateTaskDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
