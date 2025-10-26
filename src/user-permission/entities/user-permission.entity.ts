import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';

export enum PermissionMode {
    GRANT = 'GRANT',
    DENY = 'DENY'
}

@Entity()
export class UserPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: PermissionMode
    })
    mode: PermissionMode;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'appUserId' })
    user: User;

    @ManyToOne(() => Permission, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;
}
