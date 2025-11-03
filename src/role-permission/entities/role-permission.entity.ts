import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';

@Entity()
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
    public created_at: Date;

    @ManyToOne(() => Role, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: false })
    @JoinColumn({ name: 'roleId' })
    role: Role;

    @ManyToOne(() => Permission, { nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: false })
    @JoinColumn({ name: 'permissionId' })
    permission: Permission;
}
