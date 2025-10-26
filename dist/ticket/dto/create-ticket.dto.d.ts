import { TicketType, TicketPriority, TicketStatus, TicketOutcome, CreatedAsRole } from '../entities/ticket.entity';
export declare class CreateTicketDto {
    clientId: number;
    installationId?: number;
    typeCode: TicketType;
    priorityCode?: TicketPriority;
    statusCode?: TicketStatus;
    subject: string;
    description?: string;
    employeeId?: number;
    scheduledStart?: string;
    outcome?: TicketOutcome;
    openedAt: string;
    closedAt?: string;
    createdByUserId: number;
    createdAsRole?: CreatedAsRole;
}
