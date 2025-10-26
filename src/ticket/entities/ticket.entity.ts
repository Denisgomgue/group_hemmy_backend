import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Installation } from '../../installation/entities/installation.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { User } from '../../users/entities/user.entity';

export enum TicketType {
    TECHNICAL = 'TECHNICAL',
    BILLING = 'BILLING',
    COMPLAINT = 'COMPLAINT',
    REQUEST = 'REQUEST',
    OTHER = 'OTHER'
}

export enum TicketPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    URGENT = 'URGENT'
}

export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
    CANCELLED = 'CANCELLED'
}

export enum TicketOutcome {
    RESOLVED = 'RESOLVED',
    NOT_RESOLVED = 'NOT_RESOLVED',
    DUPLICATE = 'DUPLICATE',
    CANCELLED = 'CANCELLED',
    ESCALATED = 'ESCALATED'
}

export enum CreatedAsRole {
    CUSTOMER = 'CUSTOMER',
    TECH = 'TECH',
    ADMIN = 'ADMIN'
}

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: TicketType
    })
    typeCode: TicketType;

    @Column({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.MEDIUM
    })
    priorityCode: TicketPriority;

    @Column({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN
    })
    statusCode: TicketStatus;

    @Column()
    subject: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    scheduledStart: Date;

    @Column({
        type: 'enum',
        enum: TicketOutcome,
        nullable: true
    })
    outcome: TicketOutcome;

    @Column()
    openedAt: Date;

    @Column({ nullable: true })
    closedAt: Date;

    @Column({
        type: 'enum',
        enum: CreatedAsRole,
        default: CreatedAsRole.CUSTOMER
    })
    createdAsRole: CreatedAsRole;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @ManyToOne(() => Installation)
    @JoinColumn({ name: 'installationId' })
    installation: Installation;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdByUserId' })
    createdByUser: User;
}
