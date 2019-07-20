import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// Entites represent tables - They can carry logic under the hood to make it 'easy' to work with the db without writing queries
@Entity()
export class Task extends BaseEntity{
  @PrimaryGeneratedColumn() // this is the id and should be automatically incremented when a new task is created
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
