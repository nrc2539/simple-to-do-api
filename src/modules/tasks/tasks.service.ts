import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetAllTasksDto } from './dto/get-all-tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/db/entities/task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task.enum';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  public async findAllTasks(getAllTasksDto: GetAllTasksDto): Promise<Task[]> {
    const { search, status } = getAllTasksDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status =:status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title ilike :search OR task.description ilike :search)',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  public async findOneTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task id ${id} not found`);
    }
    return task;
  }

  public async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    console.log(`task name ---> ${title}, description ${description}.`);
    return task;
  }

  public async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    const { title, description, status } = updateTaskDto;
    const task = await this.findOneTask(id);
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (status) {
      task.status = status;
    }
    await this.taskRepository.save(task);
    return task;
  }

  public async deleteTask(id: number) {
    const task = await this.findOneTask(id);
    await this.taskRepository.delete({ id: task.id });
    return `task ID ${id} deleted.`;
  }
}
