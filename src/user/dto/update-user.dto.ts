import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateUserDto, USER_TYPE } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  isEnabled?: boolean = true;

  @IsOptional()
  refreshToken?: string | null;

  @IsEnum(USER_TYPE)
  @IsOptional()
  userType?: USER_TYPE;
}
