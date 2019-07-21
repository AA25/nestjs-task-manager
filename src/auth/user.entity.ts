import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
