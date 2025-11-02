import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Actor } from '../../actor/entities/actor.entity';

export enum ClientStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED'
}


@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ClientStatus,
        nullable: true
    })
    status: ClientStatus;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @UpdateDateColumn({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    public updated_at: Date;

    @Column({ nullable: true })
    actorId: number;

    @ManyToOne(() => Actor)
    @JoinColumn({ name: 'actorId' })
    actor: Actor;
}
