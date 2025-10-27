import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from '../../service/entities/service.entity';
import { Plan } from '../../plan/entities/plan.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';

export enum ChargeTypeCode {
    SUBSCRIPTION = 'SUBSCRIPTION',
    ADDON = 'ADDON',
    RECONNECTION = 'RECONNECTION',
    DISCOUNT = 'DISCOUNT',
    OTHER = 'OTHER'
}

@Entity()
export class InvoiceItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lineNumber: number;

    @Column({
        type: 'enum',
        enum: ChargeTypeCode,
        nullable: true
    })
    chargeTypeCode: ChargeTypeCode;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 3, default: 1.000 })
    quantity: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    unitPrice: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    lineTotal: number;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => Invoice)
    @JoinColumn({ name: 'invoiceId' })
    invoice: Invoice;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'serviceId' })
    service: Service;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'planId' })
    plan: Plan;
}
