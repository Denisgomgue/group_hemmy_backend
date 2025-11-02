import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    // Prevenir crear roles con isSystem: true manualmente
    // Solo deben crearse vía seeders
    if (createRoleDto.isSystem === true) {
      throw new ForbiddenException(
        'No se pueden crear roles del sistema manualmente. Use seeders para crear roles del sistema.',
      );
    }

    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
  }

  async findAll() {
    return this.roleRepository.find({
      order: { created_at: 'ASC' },
    });
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir CUALQUIER modificación del rol SUPERADMIN
    if (role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'El rol SUPERADMIN es inmutable. No se puede modificar de ninguna manera. Este rol es esencial para la seguridad del sistema.',
      );
    }

    // Prevenir modificar el código de roles del sistema
    if (role.isSystem && updateRoleDto.code && updateRoleDto.code !== role.code) {
      throw new ForbiddenException(
        'No se puede modificar el código de un rol del sistema. Esto podría romper funcionalidades críticas.',
      );
    }

    // Prevenir cambiar isSystem de true a false en roles críticos
    if (role.isSystem && updateRoleDto.isSystem === false) {
      throw new ForbiddenException(
        `No se puede desactivar el flag isSystem del rol ${role.name}. Los roles del sistema no pueden modificarse de esta manera.`,
      );
    }

    // Prevenir cambiar isSystem de false a true (solo vía seeders)
    if (!role.isSystem && updateRoleDto.isSystem === true) {
      throw new ForbiddenException(
        'No se puede convertir un rol normal en un rol del sistema. Use seeders para crear roles del sistema.',
      );
    }

    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Rol con ID ${id} no encontrado`);
    }

    // 🔒 PROTECCIÓN CRÍTICA: Prevenir eliminar el rol SUPERADMIN
    if (role.code === 'SUPERADMIN') {
      throw new ForbiddenException(
        'El rol SUPERADMIN es inmutable y no puede ser eliminado. Este rol es esencial para la seguridad del sistema.',
      );
    }

    // Prevenir eliminar roles del sistema
    if (role.isSystem) {
      throw new ForbiddenException(
        `No se puede eliminar el rol "${role.name}" (${role.code}). Este es un rol del sistema esencial para el funcionamiento de la aplicación.`,
      );
    }

    return this.roleRepository.remove(role);
  }
}
