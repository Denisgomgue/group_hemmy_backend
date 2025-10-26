import { EmployeeStatus } from '../entities/employee.entity';
export declare class CreateEmployeeDto {
    hireDate?: string;
    status: EmployeeStatus;
    jobTitle?: string;
    personId: number;
}
