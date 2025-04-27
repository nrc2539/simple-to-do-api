import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.enum';

export class GetAllTasksDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
