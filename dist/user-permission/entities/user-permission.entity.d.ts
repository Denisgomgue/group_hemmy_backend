import { User } from '../../users/entities/user.entity';
import { Permission } from '../../permission/entities/permission.entity';
export declare enum PermissionMode {
    GRANT = "GRANT",
    DENY = "DENY"
}
export declare class UserPermission {
    id: number;
    mode: PermissionMode;
    created_at: Date;
    user: User;
    permission: Permission;
}
