import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Equipment } from '../../equipment/entities/equipment.entity';

export enum ActionType {
    ASSIGNMENT = 'assignment',
    TRANSFER = 'transfer',
    MAINTENANCE = 'maintenance',
    RETURN = 'return',
    RETIREMENT = 'retirement',
    LOCATION_CHANGE = 'location_change'
}

@Entity('equipment_history')
export class EquipmentHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ActionType
    })
    actionType: ActionType;

    @Column({ nullable: true })
    reason: string;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public actionDate: Date;

    @Column({ nullable: true })
    performedBy: number;

    @Column({ nullable: true })
    fromClientId: number;

    @Column({ nullable: true })
    toClientId: number;

    @Column({ nullable: true })
    fromInstallationId: number;

    @Column({ nullable: true })
    toInstallationId: number;

    @Column({ nullable: true })
    fromEmployeeId: number;

    @Column({ nullable: true })
    toEmployeeId: number;

    @ManyToOne(() => Equipment)
    @JoinColumn({ name: 'equipmentId' })
    equipment: Equipment;
}
