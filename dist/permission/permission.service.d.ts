import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
export declare class PermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    create(createPermissionDto: CreatePermissionDto): Promise<Permission>;
    findByResourceId(resourceId: number): Promise<Permission[]>;
    findAll(): Promise<Permission[]>;
    findOne(id: number): Promise<Permission>;
    update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission>;
    remove(id: number): Promise<void>;
}
