import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
export declare class RolePermission {
    id: number;
    created_at: Date;
    role: Role;
    permission: Permission;
}
