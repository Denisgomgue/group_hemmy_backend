import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from '../../payment/entities/payment.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';

@Entity()
export class PaymentItem {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0.00 })
    discount: number;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => Payment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'paymentId' })
    payment: Payment;

    @ManyToOne(() => Invoice, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'invoiceId' })
    invoice: Invoice;
}

