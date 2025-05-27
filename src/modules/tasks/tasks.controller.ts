import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTasks(@Body() getAllTasksDto: GetAllTasksDto) {
    const tasks = await this.taskService.findAllTasks(getAllTasksDto);
    return tasks;
  }

  @Get(':id')
  async getTaskFindOne(@Param('id') id: number) {
    const task = await this.taskService.findOneTask(id);
    return task;
  }

  @Post()
  async crateTask(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.createTask(createTaskDto);
    return task;
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskService.updateTask(id, updateTaskDto);
    return task;
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number) {
    return await this.taskService.deleteTask(id);
  }
}
