import { Person } from '../../person/entities/person.entity';
export declare enum EmployeeStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Employee {
    id: number;
    hireDate: Date;
    status: EmployeeStatus;
    jobTitle: string;
    created_at: Date;
    updated_at: Date;
    person: Person;
}
