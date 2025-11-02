import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRole } from './entities/user-role.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserRoleDto: CreateUserRoleDto) {
    // Obtener usuario y rol
    const user = await this.userRepository.findOne({
      where: { id: createUserRoleDto.UserId },
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${createUserRoleDto.UserId} no encontrado`);
    }

    const role = await this.roleRepository.findOne({
      where: { id: createUserRoleDto.roleId },
    });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${createUserRoleDto.roleId} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir asignar rol SUPERADMIN a usuarios
    if (role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'No se puede asignar el rol SUPERADMIN a usuarios mediante esta API. El rol SUPERADMIN solo puede ser asignado mediante seeders o por un administrador del sistema con privilegios especiales.',
      );
    }

    // Verificar si ya tiene este rol
    const existing = await this.userRoleRepository.findOne({
      where: {
        user: { id: user.id },
        role: { id: role.id },
      },
    });

    if (existing) {
      throw new ForbiddenException(`El usuario ya tiene el rol "${role.name}" asignado`);
    }

    const userRole = this.userRoleRepository.create({
      user,
      role,
      assignedAt: createUserRoleDto.assignedAt || new Date(),
    });

    return this.userRoleRepository.save(userRole);
  }

  async findAll() {
    return this.userRoleRepository.find({
      relations: [ 'user', 'role' ],
      order: { assignedAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: [ 'user', 'role' ],
    });

    if (!userRole) {
      throw new NotFoundException(`UserRole con ID ${id} no encontrado`);
    }

    return userRole;
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: [ 'user', 'role' ],
    });

    if (!userRole) {
      throw new NotFoundException(`UserRole con ID ${id} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir modificar asignaciones de rol SUPERADMIN
    if (userRole.role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'No se pueden modificar las asignaciones del rol SUPERADMIN. Este rol es inmutable por seguridad.',
      );
    }

    // Si se está cambiando el rol, verificar que no sea SUPERADMIN
    if (updateUserRoleDto.roleId) {
      const newRole = await this.roleRepository.findOne({
        where: { id: updateUserRoleDto.roleId },
      });

      if (newRole && newRole.code === 'SUPERADMIN') {
        throw new ForbiddenException(
          'No se puede asignar el rol SUPERADMIN mediante esta API. Este rol solo puede ser asignado mediante seeders.',
        );
      }
    }

    Object.assign(userRole, updateUserRoleDto);
    return this.userRoleRepository.save(userRole);
  }

  async remove(id: number) {
    const userRole = await this.userRoleRepository.findOne({
      where: { id },
      relations: [ 'user', 'role' ],
    });

    if (!userRole) {
      throw new NotFoundException(`UserRole con ID ${id} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir eliminar asignaciones de rol SUPERADMIN
    if (userRole.role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'No se pueden eliminar las asignaciones del rol SUPERADMIN. Este rol es inmutable por seguridad.',
      );
    }

    return this.userRoleRepository.remove(userRole);
  }
}
