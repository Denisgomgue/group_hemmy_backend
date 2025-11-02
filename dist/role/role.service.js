"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
let RoleService = class RoleService {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(createRoleDto) {
        if (createRoleDto.isSystem === true) {
            throw new common_1.ForbiddenException('No se pueden crear roles del sistema manualmente. Use seeders para crear roles del sistema.');
        }
        const role = this.roleRepository.create(createRoleDto);
        return this.roleRepository.save(role);
    }
    async findAll() {
        return this.roleRepository.find({
            order: { created_at: 'ASC' },
        });
    }
    async findOne(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        }
        return role;
    }
    async update(id, updateRoleDto) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        }
        if (role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('El rol SUPERADMIN es inmutable. No se puede modificar de ninguna manera. Este rol es esencial para la seguridad del sistema.');
        }
        if (role.isSystem && updateRoleDto.code && updateRoleDto.code !== role.code) {
            throw new common_1.ForbiddenException('No se puede modificar el código de un rol del sistema. Esto podría romper funcionalidades críticas.');
        }
        if (role.isSystem && updateRoleDto.isSystem === false) {
            throw new common_1.ForbiddenException(`No se puede desactivar el flag isSystem del rol ${role.name}. Los roles del sistema no pueden modificarse de esta manera.`);
        }
        if (!role.isSystem && updateRoleDto.isSystem === true) {
            throw new common_1.ForbiddenException('No se puede convertir un rol normal en un rol del sistema. Use seeders para crear roles del sistema.');
        }
        Object.assign(role, updateRoleDto);
        return this.roleRepository.save(role);
    }
    async remove(id) {
        const role = await this.roleRepository.findOne({ where: { id } });
        if (!role) {
            throw new common_1.NotFoundException(`Rol con ID ${id} no encontrado`);
        }
        if (role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('El rol SUPERADMIN es inmutable y no puede ser eliminado. Este rol es esencial para la seguridad del sistema.');
        }
        if (role.isSystem) {
            throw new common_1.ForbiddenException(`No se puede eliminar el rol "${role.name}" (${role.code}). Este es un rol del sistema esencial para el funcionamiento de la aplicación.`);
        }
        return this.roleRepository.remove(role);
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map