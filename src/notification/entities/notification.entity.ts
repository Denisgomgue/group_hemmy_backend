import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificationType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR'
}

export enum NotificationCategory {
    // Clientes
    CLIENT_CREATED = 'CLIENT_CREATED',
    CLIENT_UPDATED = 'CLIENT_UPDATED',
    CLIENT_STATUS_CHANGED = 'CLIENT_STATUS_CHANGED',

    // Instalaciones
    INSTALLATION_CREATED = 'INSTALLATION_CREATED',
    INSTALLATION_COMPLETED = 'INSTALLATION_COMPLETED',
    INSTALLATION_STATUS_CHANGED = 'INSTALLATION_STATUS_CHANGED',

    // Suscripciones
    SUBSCRIPTION_CREATED = 'SUBSCRIPTION_CREATED',
    SUBSCRIPTION_ACTIVATED = 'SUBSCRIPTION_ACTIVATED',
    SUBSCRIPTION_SUSPENDED = 'SUBSCRIPTION_SUSPENDED',
    SUBSCRIPTION_CANCELLED = 'SUBSCRIPTION_CANCELLED',

    // Pagos
    PAYMENT_CREATED = 'PAYMENT_CREATED',
    PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
    PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
    PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',

    // Tickets
    TICKET_CREATED = 'TICKET_CREATED',
    TICKET_ASSIGNED = 'TICKET_ASSIGNED',
    TICKET_UPDATED = 'TICKET_UPDATED',
    TICKET_RESOLVED = 'TICKET_RESOLVED',

    // Usuarios
    USER_CREATED = 'USER_CREATED',
    USER_DEACTIVATED = 'USER_DEACTIVATED',
    ROLE_ASSIGNED = 'ROLE_ASSIGNED',

    // Sistema
    SYSTEM_ALERT = 'SYSTEM_ALERT',
    MAINTENANCE_SCHEDULED = 'MAINTENANCE_SCHEDULED'
}

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: NotificationType,
        default: NotificationType.INFO
    })
    type: NotificationType;

    @Column({
        type: 'enum',
        enum: NotificationCategory
    })
    category: NotificationCategory;

    @Column()
    title: string;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'text', nullable: true })
    details: string;

    @Column({ default: false })
    isRead: boolean;

    @Column({ nullable: true })
    readAt: Date;

    @Column({ nullable: true })
    actionUrl: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    // Campos opcionales para relación con entidades específicas
    @Column({ nullable: true })
    relatedEntityId: number;

    @Column({ nullable: true })
    relatedEntityType: string;
}

