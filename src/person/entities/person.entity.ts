import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';

export enum DocumentType {
    DNI = 'DNI',
    // RUC = 'RUC',
    // PASSPORT = 'PASSPORT',
    // CE = 'CE'
}

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: DocumentType,
        nullable: true
    })
    documentType: DocumentType;

    @Column({ nullable: true, unique: true })
    documentNumber: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    birthdate: Date;

    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;
}
