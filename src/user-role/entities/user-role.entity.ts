import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    assignedAt: Date;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'UserId' })
    user: User;

    @ManyToOne(() => Role, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'assignedBy' })
    assignedByUser: User;
}
