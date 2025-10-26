import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
    create(createUserRoleDto: CreateUserRoleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUserRoleDto: UpdateUserRoleDto): string;
    remove(id: string): string;
}
