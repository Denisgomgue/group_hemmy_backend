import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { User } from '../../users/entities/user.entity';

export enum PaymentStatusCode {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    CANCELLED = 'CANCELLED',
    REFUNDED = 'REFUNDED'
}

export enum PaymentMethodCode {
    // bcpp
    // interback 3
    CASH = 'CASH',
    TRANSFER = 'TRANSFER',
    YAPE = 'YAPE',
    PLIN = 'PLIN',
    OTHER = 'OTHER'
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: PaymentStatusCode
    })
    statusCode: PaymentStatusCode;

    @Column({ nullable: true })
    paymentDate: Date;

    @Column({ nullable: true })
    scheduledDueDate: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amountTotal: number;

    @Column({
        type: 'enum',
        enum: PaymentMethodCode,
        nullable: true
    })
    methodCode: PaymentMethodCode;

    @Column({ nullable: true })
    reference: string;

    @Column({ default: false })
    isVoid: boolean;

    @Column({ nullable: true })
    voidReason: string;

    @Column({ nullable: true })
    voidedAt: Date;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdByUserId' })
    createdByUser: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'voidedByUserId' })
    voidedByUser: User;
}
