import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  isEnabled?: boolean = true;

  @IsOptional()
  refreshToken?: string | null;
}
