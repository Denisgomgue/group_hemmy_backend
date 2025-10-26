import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

export enum EmployeeStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    hireDate: Date;

    @Column({
        type: 'enum',
        enum: EmployeeStatus,
        nullable: true
    })
    status: EmployeeStatus;

    @Column({ nullable: true })
    jobTitle: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @ManyToOne(() => Person)
    @JoinColumn({ name: 'personId' })
    person: Person;
}
