import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';

export enum OrganizationDocumentType {
    RUC = 'RUC'
}

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    legalName: string;

    @Column({
        type: 'enum',
        enum: OrganizationDocumentType,
        nullable: true
    })
    documentType: OrganizationDocumentType;

    @Column({ nullable: true, unique: true })
    documentNumber: string;


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

    @ManyToOne(() => Person)
    @JoinColumn({ name: 'representativePersonId' })
    representativePerson: Person;
}
