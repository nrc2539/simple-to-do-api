import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';

@Injectable()
export class TasksService {
  findAllTasks(getAllTasksDto: GetAllTasksDto) {
    const { search, status } = getAllTasksDto;
    console.log(`get tasks with Search -> ${search}, Status -> ${status}`);
    return [1, 2, 3];
  }

  findOneTask(id: string) {
    console.log(`get task by ID ->${id}`);
    return {
      id,
      name: `task ${id}`,
    };
  }

  createTask(createTaskDto: CreateTaskDto) {
    const { name, description } = createTaskDto;
    console.log(`task name ---> ${name}, description ${description}`);
  }

  deleteTask(id: string) {
    console.log(`delete task by ID -> ${id}`);
    return `task ID ${id} deleted.`;
  }
}
