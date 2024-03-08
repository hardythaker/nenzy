import { Transform } from "class-transformer";
import { IsArray, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min, MinDate, ValidateNested } from "class-validator";

export class CreateJobDto {
    @IsString()
    @IsNotEmpty()
    title!: string;
    
    @IsString()
    @IsNotEmpty()
    level!: string

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    customQuestions!: string[];

    @IsString()
    @IsNotEmpty()
    departmentId!: string;

    @IsOptional()
    @IsInt()
    @Min(1) // Optional validation for positive limit
    limit?: number;

    @IsDateString()
    endDate!: Date;
}
