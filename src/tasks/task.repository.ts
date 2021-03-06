import { Repository, EntityRepository, DeleteResult } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
// This is the repository for task - This is the persistance layer
// the persistence layer is the set of classes that manage the actual reading and writing of data to persistent storage
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async createTask(
      createTaskDto: CreateTaskDto,
      user: User,
    ): Promise<Task> {
    // Destruct the object to get the keys we care about - ES6
    const {title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;

    try {
      await task.save();
    } catch (error) {
      this.logger.error(`Failed to save task for user '${user.username}'. Data: ${createTaskDto}`, error.stack);
      throw new InternalServerErrorException();
    }
    // The above was done directly to the entity
    // but this shouldn't be in the service layer but rather the persistance layer
    delete task.user;
    return task;
  }

  async deleteTask(id: number, user: User): Promise<DeleteResult> {
    // where clause not needed as id are unique
    return await this.delete({id, userId: user.id});
  }

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filterDto;
    // Query builder to build the query we are using on the database
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`});
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(`Failed to get tasks for user '${user.username}'. Filters: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
