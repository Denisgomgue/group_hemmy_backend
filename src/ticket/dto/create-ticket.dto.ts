import { IsEnum, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';
import { TicketType, TicketPriority, TicketStatus, TicketOutcome, CreatedAsRole } from '../entities/ticket.entity';

export class CreateTicketDto {
    @IsNumber()
    clientId: number;

    @IsOptional()
    @IsNumber()
    installationId?: number;

    @IsEnum(TicketType)
    typeCode: TicketType;

    @IsOptional()
    @IsEnum(TicketPriority)
    priorityCode?: TicketPriority;

    @IsOptional()
    @IsEnum(TicketStatus)
    statusCode?: TicketStatus;

    @IsString()
    subject: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    employeeId?: number;

    @IsOptional()
    @IsDateString()
    scheduledStart?: string;

    @IsOptional()
    @IsEnum(TicketOutcome)
    outcome?: TicketOutcome;

    @IsDateString()
    openedAt: string;

    @IsOptional()
    @IsDateString()
    closedAt?: string;

    @IsNumber()
    createdByUserId: number;

    @IsOptional()
    @IsEnum(CreatedAsRole)
    createdAsRole?: CreatedAsRole;
}
