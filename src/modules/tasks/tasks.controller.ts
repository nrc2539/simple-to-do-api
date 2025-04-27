import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(@Body() getAllTasksDto: GetAllTasksDto) {
    this.taskService.findAllTasks(getAllTasksDto);
  }

  @Get(':id')
  getTaskFindOne(@Param('id') id: string) {
    this.taskService.findOneTask(id);
  }

  @Post()
  crateTask(@Body() createTaskDto: CreateTaskDto) {
    this.taskService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }
}
