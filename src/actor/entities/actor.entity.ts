import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Person } from '../../person/entities/person.entity';
import { Organization } from '../../organization/entities/organization.entity';

export enum ActorKind {
    PERSON = 'PERSON',
    ORGANIZATION = 'ORGANIZATION'
}

@Entity()
export class Actor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ActorKind,
        nullable: true
    })
    kind: ActorKind;

    @Column()
    displayName: string;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @Column({ nullable: true })
    personId: number;

    @OneToOne(() => Person, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'personId' })
    person: Person;

    @Column({ nullable: true })
    organizationId: number;

    @OneToOne(() => Organization, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;
}
