import { IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { EmployeeStatus } from '../entities/employee.entity';

export class CreateEmployeeDto {
    @IsOptional()
    @IsDateString()
    hireDate?: string;

    @IsString()
    status: EmployeeStatus;

    @IsOptional()
    @IsString()
    jobTitle?: string;

    @IsNumber()
    personId: number;
}
