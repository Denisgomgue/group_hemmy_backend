import { Client } from '../../client/entities/client.entity';
import { Installation } from '../../installation/entities/installation.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { User } from '../../users/entities/user.entity';
export declare enum TicketType {
    TECHNICAL = "TECHNICAL",
    BILLING = "BILLING",
    COMPLAINT = "COMPLAINT",
    REQUEST = "REQUEST",
    OTHER = "OTHER"
}
export declare enum TicketPriority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    URGENT = "URGENT"
}
export declare enum TicketStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    PENDING = "PENDING",
    RESOLVED = "RESOLVED",
    CLOSED = "CLOSED",
    CANCELLED = "CANCELLED"
}
export declare enum TicketOutcome {
    RESOLVED = "RESOLVED",
    NOT_RESOLVED = "NOT_RESOLVED",
    DUPLICATE = "DUPLICATE",
    CANCELLED = "CANCELLED",
    ESCALATED = "ESCALATED"
}
export declare enum CreatedAsRole {
    CUSTOMER = "CUSTOMER",
    TECH = "TECH",
    ADMIN = "ADMIN"
}
export declare class Ticket {
    id: number;
    typeCode: TicketType;
    priorityCode: TicketPriority;
    statusCode: TicketStatus;
    subject: string;
    description: string;
    scheduledStart: Date;
    outcome: TicketOutcome;
    openedAt: Date;
    closedAt: Date;
    createdAsRole: CreatedAsRole;
    created_at: Date;
    updated_at: Date;
    client: Client;
    installation: Installation;
    employee: Employee;
    createdByUser: User;
}
