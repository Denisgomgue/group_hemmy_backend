import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) { }

  async create(createRolePermissionDto: CreateRolePermissionDto) {
    // Obtener el rol y el permiso
    const role = await this.roleRepository.findOne({
      where: { id: createRolePermissionDto.roleId },
    });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${createRolePermissionDto.roleId} no encontrado`);
    }

    const permission = await this.permissionRepository.findOne({
      where: { id: createRolePermissionDto.permissionId },
    });

    if (!permission) {
      throw new NotFoundException(
        `Permiso con ID ${createRolePermissionDto.permissionId} no encontrado`,
      );
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir asignar permiso '*' a roles que NO sean SUPERADMIN
    if (permission.code === '*' && role.code !== 'SUPERADMIN') {
      throw new ForbiddenException(
        'El permiso wildcard "*" solo puede ser asignado al rol SUPERADMIN. Este es un permiso crítico de seguridad.',
      );
    }

    // Verificar si ya existe esta asignación
    const existing = await this.rolePermissionRepository.findOne({
      where: {
        role: { id: role.id },
        permission: { id: permission.id },
      },
    });

    if (existing) {
      throw new ForbiddenException(
        `El permiso "${permission.name}" ya está asignado al rol "${role.name}"`,
      );
    }

    const rolePermission = this.rolePermissionRepository.create({
      role,
      permission,
    });

    return this.rolePermissionRepository.save(rolePermission);
  }

  async findAll() {
    return this.rolePermissionRepository.find({
      relations: [ 'role', 'permission' ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { id },
      relations: [ 'role', 'permission' ],
    });

    if (!rolePermission) {
      throw new NotFoundException(`RolePermission con ID ${id} no encontrado`);
    }

    return rolePermission;
  }

  async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { id },
      relations: [ 'role', 'permission' ],
    });

    if (!rolePermission) {
      throw new NotFoundException(`RolePermission con ID ${id} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir modificar permisos del rol SUPERADMIN
    if (rolePermission.role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'No se pueden modificar los permisos del rol SUPERADMIN. Este rol es inmutable por seguridad.',
      );
    }

    // Si se está actualizando el permiso, verificar que no sea '*'
    if (updateRolePermissionDto.permissionId) {
      const newPermission = await this.permissionRepository.findOne({
        where: { id: updateRolePermissionDto.permissionId },
      });

      if (newPermission && newPermission.code === '*' && rolePermission.role.code !== 'SUPERADMIN') {
        throw new ForbiddenException(
          'El permiso wildcard "*" solo puede ser asignado al rol SUPERADMIN.',
        );
      }
    }

    Object.assign(rolePermission, updateRolePermissionDto);
    return this.rolePermissionRepository.save(rolePermission);
  }

  async remove(id: number) {
    const rolePermission = await this.rolePermissionRepository.findOne({
      where: { id },
      relations: [ 'role', 'permission' ],
    });

    if (!rolePermission) {
      throw new NotFoundException(`RolePermission con ID ${id} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir eliminar permisos del rol SUPERADMIN
    if (rolePermission.role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'No se pueden eliminar permisos del rol SUPERADMIN. Este rol es inmutable por seguridad.',
      );
    }

    return this.rolePermissionRepository.remove(rolePermission);
  }
}
