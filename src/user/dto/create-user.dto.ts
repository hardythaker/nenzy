import { IsString } from 'class-validator';
import { login } from 'src/auth/dto/login.dto';

export enum USER_TYPE {
  company = 'company',
  candidate = 'candidate',
}

export class CreateUserDto extends login {
  @IsString()
  fullName!: string;
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
