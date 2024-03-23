import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobTitleDto {
  /**
   * Name of the job title.
   * @example "Senior Software Engineer"
   */
  @IsNotEmpty()
  name!: string;

  /**
   * The unicode of the emoji selected for job title.
   * @example U+1F600
   */
  @IsOptional()
  unicode?: string;
}
