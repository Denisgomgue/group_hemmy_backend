import { User } from '../../users/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
export declare class UserRole {
    id: number;
    assignedAt: Date;
    user: User;
    role: Role;
    assignedByUser: User;
}
