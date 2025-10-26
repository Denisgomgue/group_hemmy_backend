import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EquipmentCategory } from '../../equipment-categories/entities/equipment-category.entity';

export enum EquipmentStatus {
    STOCK = 'STOCK',
    ASSIGNED = 'ASSIGNED',
    SOLD = 'SOLD',
    MAINTENANCE = 'MAINTENANCE',
    LOST = 'LOST',
    USED = 'USED'
}

export enum EquipmentUseType {
    CLIENT = 'CLIENT',
    EMPLOYEE = 'EMPLOYEE',
    COMPANY = 'COMPANY'
}

@Entity('equipment')
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    serialNumber: string;

    @Column({ nullable: true })
    macAddress: string;

    @Column({ nullable: true })
    brand: string;

    @Column({ nullable: true })
    model: string;

    @Column({
        type: 'enum',
        enum: EquipmentStatus,
        default: EquipmentStatus.STOCK
    })
    status: EquipmentStatus;

    @Column({ type: 'date', nullable: true })
    assignedDate: Date;

    @Column({
        type: 'enum',
        enum: EquipmentUseType,
        default: EquipmentUseType.CLIENT
    })
    useType: EquipmentUseType;

    @Column({ nullable: true })
    assignedInstallationId: number;

    @Column({ nullable: true })
    assignedEmployeeId: number;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(() => EquipmentCategory)
    @JoinColumn({ name: 'categoryId' })
    category: EquipmentCategory;
}
