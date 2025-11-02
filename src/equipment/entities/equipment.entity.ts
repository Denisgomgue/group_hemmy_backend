import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EquipmentCategory } from '../../equipment-categories/entities/equipment-category.entity';
import { Installation } from '../../installation/entities/installation.entity';
import { Employee } from '../../employee/entities/employee.entity';

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

@Entity()
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
    notes: string;

    @Column({ nullable: true })
    categoryId: number;

    @Column({ nullable: true })
    installationId: number;

    @Column({ nullable: true })
    employeeId: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @ManyToOne(() => EquipmentCategory)
    @JoinColumn({ name: 'categoryId' })
    category: EquipmentCategory;

    @ManyToOne(() => Installation, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'installationId' })
    installation: Installation;

    @ManyToOne(() => Employee, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'employeeId' })
    employee: Employee;
}
