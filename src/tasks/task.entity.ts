import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

// Entites represent tables - They can carry logic under the hood to make it 'easy' to work with the db without writing queries
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn() // this is the id and should be automatically incremented when a new task is created
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // There can be many tasks for one user
  @ManyToOne(type => User, user => user. tasks, { eager: false})
  user: User;

  // This column in postgres was created for us by typeOrm due the relationship we added between users and tasks
  @Column()
  userId: number;
}
