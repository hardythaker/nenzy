import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDepartmentDto {
  /**
   * Name of the job title.
   * @example "Senior Software Engineer"
   */
  @IsNotEmpty()
  name!: string;

  /**
   * The unicode of the emoji selected for department.
   * @example U+1F600
   */
  @IsOptional()
  @IsNotEmpty()
  unicode?: string;
}
