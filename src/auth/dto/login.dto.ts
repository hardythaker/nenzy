import { ApiProperty } from '@nestjs/swagger';

export class login {
  @ApiProperty()
  username!: string;

  @ApiProperty()
  password!: string;
}
