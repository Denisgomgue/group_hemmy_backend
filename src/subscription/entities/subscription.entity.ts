import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Installation } from '../../installation/entities/installation.entity';
import { Plan } from '../../plan/entities/plan.entity';

export enum SubscriptionStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
    CANCELLED = 'CANCELLED'
}

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column()
    billingDay: number;

    @Column({
        type: 'enum',
        enum: SubscriptionStatus
    })
    status: SubscriptionStatus;

    @Column({ default: false })
    advancePayment: boolean;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Installation)
    @JoinColumn({ name: 'installationId' })
    installation: Installation;

    @ManyToOne(() => Plan)
    @JoinColumn({ name: 'planId' })
    plan: Plan;
}
