import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Installation } from '../../installation/entities/installation.entity';
import { Equipment } from '../../equipment/entities/equipment.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class InstallationEquipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    installationId: number;

    @Column()
    equipmentItemId: number;

    @Column()
    assignedAt: Date;

    @Column({ nullable: true })
    returnedAt: Date;

    @Column({ length: 64, nullable: true })
    conditionOut: string;

    @Column({ length: 64, nullable: true })
    conditionIn: string;

    @Column({ nullable: true })
    createdByUserId: number;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Installation, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'installationId' })
    installation: Installation;

    @ManyToOne(() => Equipment, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'equipmentItemId' })
    equipment: Equipment;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'createdByUserId' })
    createdByUser: User;
}
