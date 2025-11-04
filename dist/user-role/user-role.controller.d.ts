import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
    create(createUserRoleDto: CreateUserRoleDto, req: any): Promise<import("./entities/user-role.entity").UserRole[]>;
    findAll(): Promise<{
        UserId: any;
        roleId: any;
        assignedBy: any;
        id: number;
        assignedAt: Date;
        user: import("../users/entities/user.entity").User;
        role: import("../role/entities/role.entity").Role;
        assignedByUser: import("../users/entities/user.entity").User;
    }[]>;
    findOne(id: string): Promise<{
        UserId: any;
        roleId: any;
        assignedBy: any;
        id: number;
        assignedAt: Date;
        user: import("../users/entities/user.entity").User;
        role: import("../role/entities/role.entity").Role;
        assignedByUser: import("../users/entities/user.entity").User;
    }>;
    update(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<import("./entities/user-role.entity").UserRole>;
    remove(id: string): Promise<import("./entities/user-role.entity").UserRole>;
}
