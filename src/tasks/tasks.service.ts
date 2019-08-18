import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: number): Promise<Task> {
    // We retrieve the task from the repository - The persistance layer
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      // Exception won't be caught here but propagate to the controller
      // but it won't be caught there either so it'll go to NJS
      // where NJS will recognise it as a http exception and do some magic to respond to the client
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(
      createTaskDto: CreateTaskDto,
      user: User,
    ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
    // const {title, description } = createTaskDto;
    // const task = new Task();
    // task.title = title;
    // task.description = description;
    // task.status = TaskStatus.OPEN;
    // await task.save();
    // // The above was done directly to the entity
    // // but this shouldn't be in the service layer but rather the persistance layer
  }

  async deleteTask(id: number): Promise<void> {
    const deleted = await this.taskRepository.deleteTask(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
}
