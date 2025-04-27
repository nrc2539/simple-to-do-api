import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;
}
