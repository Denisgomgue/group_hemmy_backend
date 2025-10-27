import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EquipmentCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32, unique: true })
    code: string;

    @Column({ length: 100 })
    name: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;
}
