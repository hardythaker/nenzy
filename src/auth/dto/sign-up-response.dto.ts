import { ApiProperty } from '@nestjs/swagger';
import { LoginResponse } from './LoginResponse.dto';

export class SignUpResponse extends LoginResponse {
  @ApiProperty()
  id!: string;
}
