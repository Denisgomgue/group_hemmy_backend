import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Equipment } from '../../equipment/entities/equipment.entity';
import { Sector } from '../../sector/entities/sector.entity';
import { User } from '../../users/entities/user.entity';

export enum ActionType {
    ASSIGNMENT = 'assignment',
    TRANSFER = 'transfer',
    MAINTENANCE = 'maintenance',
    RETURN = 'return',
    RETIREMENT = 'retirement',
    LOCATION_CHANGE = 'location_change'
}

@Entity()
export class EquipmentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ActionType
    })
    actionType: ActionType;

    @Column({ nullable: true })
    fromInstallationId: number;

    @Column({ nullable: true })
    toInstallationId: number;

    @Column()
    actionDate: Date;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => Equipment)
    @JoinColumn({ name: 'equipmentId' })
    equipment: Equipment;

    @ManyToOne(() => Sector, { nullable: true })
    @JoinColumn({ name: 'fromSectorId' })
    fromSector: Sector;

    @ManyToOne(() => Sector, { nullable: true })
    @JoinColumn({ name: 'toSectorId' })
    toSector: Sector;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'performedBy' })
    user: User;
}
