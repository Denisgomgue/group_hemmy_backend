import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('equipment_categories')
export class EquipmentCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32, unique: true })
    code: string;

    @Column({ length: 100 })
    name: string;
}
