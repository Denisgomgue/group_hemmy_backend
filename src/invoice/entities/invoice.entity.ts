import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { Client } from '../../client/entities/client.entity';

export enum InvoiceStatusCode {
    PENDING = 'PENDING',
    LATE = 'LATE',
    PAID = 'PAID',
    VOIDED = 'VOIDED',
    PARTIAL = 'PARTIAL'
}

@Entity()
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, unique: true })
    code: string;

    @Column()
    issueDate: Date;

    @Column()
    dueDate: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    baseAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.00 })
    discountAmount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.00 })
    reconnectionFee: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    totalAmount: number;

    @Column({
        type: 'enum',
        enum: InvoiceStatusCode,
        nullable: true
    })
    statusCode: InvoiceStatusCode;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Subscription)
    @JoinColumn({ name: 'subscriptionId' })
    subscription: Subscription;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'customerId' })
    customer: Client;
}
