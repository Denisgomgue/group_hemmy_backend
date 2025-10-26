import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { Client } from '../../client/entities/client.entity';
import { User } from '../../users/entities/user.entity';

export enum EntryType {
    ISSUE = 'ISSUE',
    PAYMENT = 'PAYMENT',
    VOID = 'VOID',
    ADJUSTMENT = 'ADJUSTMENT',
    RECONNECT = 'RECONNECT',
    SUSPEND = 'SUSPEND'
}

@Entity()
export class InvoiceLedger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: EntryType
    })
    entryType: EntryType;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    description: string;

    @Column()
    effectiveDate: Date;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => Invoice)
    @JoinColumn({ name: 'invoiceId' })
    invoice: Invoice;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;
}
