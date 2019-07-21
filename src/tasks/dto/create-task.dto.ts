import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // Class validator which at runtime do magic to the class
  // This can then be used by validation pipes to validate the data
  // against these rules
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
