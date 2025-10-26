import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Actor } from '../../actor/entities/actor.entity';
import { Installation } from '../../installation/entities/installation.entity';

export enum AddressType {
    FISCAL = 'FISCAL',
    SERVICE = 'SERVICE',
    BILLING = 'BILLING',
    NOTIFICATION = 'NOTIFICATION',
    OTHER = 'OTHER'
}

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: AddressType
    })
    addressType: AddressType;

    @Column({ nullable: true })
    addressLine: string;

    @Column({ nullable: true })
    reference: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    region: string;

    @Column({ nullable: true })
    province: string;

    @Column({ nullable: true })
    district: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    locality: string;

    @Column({ nullable: true })
    ubigeo: string;

    @Column({ default: false })
    isPrimary: boolean;

    @Column({ nullable: true })
    validFrom: Date;

    @Column({ nullable: true })
    validTo: Date;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Actor)
    @JoinColumn({ name: 'actorId' })
    actor: Actor;

    @ManyToOne(() => Installation)
    @JoinColumn({ name: 'installationId' })
    installation: Installation;
}
