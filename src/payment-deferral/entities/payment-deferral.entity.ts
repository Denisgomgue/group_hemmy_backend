import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { User } from '../../users/entities/user.entity';

export enum PaymentDeferralStatus {
    PENDING = 'PENDING',
    HONORED = 'HONORED',
    DEFAULTED = 'DEFAULTED',
    CANCELED = 'CANCELED'
}

@Entity()
export class PaymentDeferral {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'date' })
    scheduledPaymentDate: Date;

    @Column({
        type: 'enum',
        enum: PaymentDeferralStatus,
        default: PaymentDeferralStatus.PENDING
    })
    status: PaymentDeferralStatus;

    @Column({ type: 'datetime' })
    requestedOn: Date;

    @Column({ nullable: true, length: 255 })
    reason: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'datetime', nullable: true })
    canceledAt: Date;

    @Column({ type: 'datetime', nullable: true })
    defaultedAt: Date;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => Client, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @ManyToOne(() => Invoice, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'invoiceId' })
    invoice: Invoice;

    @ManyToOne(() => Payment, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'honoredPaymentId' })
    honoredPayment: Payment;

    @ManyToOne(() => User, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'createdByUserId' })
    createdByUser: User;
}


