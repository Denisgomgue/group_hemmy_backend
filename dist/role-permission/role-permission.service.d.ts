import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
export declare class RolePermissionService {
    private rolePermissionRepository;
    private roleRepository;
    private permissionRepository;
    constructor(rolePermissionRepository: Repository<RolePermission>, roleRepository: Repository<Role>, permissionRepository: Repository<Permission>);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<RolePermission>;
    findAll(): Promise<RolePermission[]>;
    findOne(id: number): Promise<RolePermission>;
    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermission>;
    remove(id: number): Promise<RolePermission>;
}
