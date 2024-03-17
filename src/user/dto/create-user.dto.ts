import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export enum USER_TYPE {
  company = 'company',
  candidate = 'candidate',
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password!: string;

  @IsEnum(USER_TYPE)
  userType!: USER_TYPE;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  isEnabled?: boolean = true;

  @IsOptional()
  refreshToken?: string | null;
}

// {
//   "fullName": "Hardik Thaker",
//   "email": "hardik.thaker1994@gmail.com",
//   "password": "Pass@123",
//   "userType": "company",
//   "companyName": "Any",
//   "companySize": "11 - 50",
//   "companyDeparments": ["IT"],
//   "roles": ["owner","admin"]
// }

// {
//   "fullName": "Hardik Thaker",
//   "email": "hardik.thaker1994@gmail.com",
//   "password": "Pass@123",
//   "userType": "candidate",
// }
