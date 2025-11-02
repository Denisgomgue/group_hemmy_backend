import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Sector } from '../../sector/entities/sector.entity';

export enum InstallationStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

@Entity()
export class Installation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ nullable: true })
    imagePath: string;

    @Column({ nullable: true })
    installedAt: Date;

    @Column({
        type: 'enum',
        enum: InstallationStatus,
        nullable: true
    })
    status: InstallationStatus;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @Column({ nullable: true })
    clientId: number;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @Column({ nullable: true })
    sectorId: number;

    @ManyToOne(() => Sector)
    @JoinColumn({ name: 'sectorId' })
    sector: Sector;
}
