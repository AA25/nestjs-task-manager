import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/task.entity';
@Entity()
// username column should be unique - This is on the DB level!
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // Establishing a relationship between a user and tasks
  // A user can have many tasks
  // eager set to true allows user tasks from this user to be retrieved immediately
  @OneToMany(type => Task, task => task.user, { eager: true})
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
