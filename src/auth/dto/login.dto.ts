import { IsEmail } from 'class-validator';
import { Password } from './password.dto';

export class login extends Password {
  @IsEmail()
  username!: string;
}
