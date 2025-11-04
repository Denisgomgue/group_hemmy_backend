import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../users/entities/user.entity';
export declare class UserRoleService {
    private userRoleRepository;
    private roleRepository;
    private userRepository;
    constructor(userRoleRepository: Repository<UserRole>, roleRepository: Repository<Role>, userRepository: Repository<User>);
    create(createUserRoleDto: CreateUserRoleDto, assignedByUserId?: number): Promise<UserRole[]>;
    findAll(): Promise<{
        UserId: any;
        roleId: any;
        assignedBy: any;
        id: number;
        assignedAt: Date;
        user: User;
        role: Role;
        assignedByUser: User;
    }[]>;
    findOne(id: number): Promise<{
        UserId: any;
        roleId: any;
        assignedBy: any;
        id: number;
        assignedAt: Date;
        user: User;
        role: Role;
        assignedByUser: User;
    }>;
    update(id: number, updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole>;
    remove(id: number): Promise<UserRole>;
}
