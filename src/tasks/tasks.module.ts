import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]), // list of entities or repositorys you want in this ecosystem of the module
    AuthModule, // We know get access to the exports of AuthModule module, e.g. the JWT strategy
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
