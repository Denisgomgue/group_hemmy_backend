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
exports.RolePermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const role_entity_1 = require("../role/entities/role.entity");
const permission_entity_1 = require("../permission/entities/permission.entity");
let RolePermissionService = class RolePermissionService {
    rolePermissionRepository;
    roleRepository;
    permissionRepository;
    constructor(rolePermissionRepository, roleRepository, permissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }
    async create(createRolePermissionDto) {
        const role = await this.roleRepository.findOne({
            where: { id: createRolePermissionDto.roleId },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Rol con ID ${createRolePermissionDto.roleId} no encontrado`);
        }
        const permission = await this.permissionRepository.findOne({
            where: { id: createRolePermissionDto.permissionId },
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permiso con ID ${createRolePermissionDto.permissionId} no encontrado`);
        }
        if (permission.code === '*' && role.code !== 'SUPERADMIN') {
            throw new common_1.ForbiddenException('El permiso wildcard "*" solo puede ser asignado al rol SUPERADMIN. Este es un permiso crítico de seguridad.');
        }
        const existing = await this.rolePermissionRepository.findOne({
            where: {
                role: { id: role.id },
                permission: { id: permission.id },
            },
            relations: ['role', 'permission'],
        });
        if (existing) {
            throw new common_1.ForbiddenException(`El permiso "${permission.name}" ya está asignado al rol "${role.name}"`);
        }
        const rolePermission = this.rolePermissionRepository.create({
            role,
            permission,
        });
        const saved = await this.rolePermissionRepository.save(rolePermission);
        const result = await this.rolePermissionRepository.findOne({
            where: { id: saved.id },
            relations: ['role', 'permission'],
        });
        if (!result) {
            throw new common_1.NotFoundException(`Error al crear RolePermission`);
        }
        return {
            ...result,
            roleId: result.role?.id || result.roleId,
            permissionId: result.permission?.id || result.permissionId,
        };
    }
    async findAll(roleId, permissionId) {
        const where = {};
        if (roleId) {
            where.role = { id: roleId };
        }
        if (permissionId) {
            where.permission = { id: permissionId };
        }
        const results = await this.rolePermissionRepository.find({
            where,
            relations: ['role', 'permission'],
            order: { created_at: 'DESC' },
        });
        return results.map(rp => ({
            ...rp,
            roleId: rp.role?.id || rp.roleId,
            permissionId: rp.permission?.id || rp.permissionId,
        }));
    }
    async findByRoleId(roleId) {
        const results = await this.rolePermissionRepository.find({
            where: { role: { id: roleId } },
            relations: ['role', 'permission'],
            order: { created_at: 'DESC' },
        });
        return results.map(rp => ({
            ...rp,
            roleId: rp.role?.id || rp.roleId,
            permissionId: rp.permission?.id || rp.permissionId,
        }));
    }
    async findByPermissionId(permissionId) {
        const results = await this.rolePermissionRepository.find({
            where: { permission: { id: permissionId } },
            relations: ['role', 'permission'],
            order: { created_at: 'DESC' },
        });
        return results.map(rp => ({
            ...rp,
            roleId: rp.role?.id || rp.roleId,
            permissionId: rp.permission?.id || rp.permissionId,
        }));
    }
    async findOne(id) {
        const rolePermission = await this.rolePermissionRepository.findOne({
            where: { id },
            relations: ['role', 'permission'],
        });
        if (!rolePermission) {
            throw new common_1.NotFoundException(`RolePermission con ID ${id} no encontrado`);
        }
        return {
            ...rolePermission,
            roleId: rolePermission.role?.id || rolePermission.roleId,
            permissionId: rolePermission.permission?.id || rolePermission.permissionId,
        };
    }
    async update(id, updateRolePermissionDto) {
        const rolePermission = await this.rolePermissionRepository.findOne({
            where: { id },
            relations: ['role', 'permission'],
        });
        if (!rolePermission) {
            throw new common_1.NotFoundException(`RolePermission con ID ${id} no encontrado`);
        }
        if (rolePermission.role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('No se pueden modificar los permisos del rol SUPERADMIN. Este rol es inmutable por seguridad.');
        }
        if (updateRolePermissionDto.permissionId) {
            const newPermission = await this.permissionRepository.findOne({
                where: { id: updateRolePermissionDto.permissionId },
            });
            if (newPermission && newPermission.code === '*' && rolePermission.role.code !== 'SUPERADMIN') {
                throw new common_1.ForbiddenException('El permiso wildcard "*" solo puede ser asignado al rol SUPERADMIN.');
            }
        }
        Object.assign(rolePermission, updateRolePermissionDto);
        return this.rolePermissionRepository.save(rolePermission);
    }
    async remove(id) {
        const rolePermission = await this.rolePermissionRepository.findOne({
            where: { id },
            relations: ['role', 'permission'],
        });
        if (!rolePermission) {
            throw new common_1.NotFoundException(`RolePermission con ID ${id} no encontrado`);
        }
        if (rolePermission.role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('No se pueden eliminar permisos del rol SUPERADMIN. Este rol es inmutable por seguridad.');
        }
        return this.rolePermissionRepository.remove(rolePermission);
    }
};
exports.RolePermissionService = RolePermissionService;
exports.RolePermissionService = RolePermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolePermissionService);
//# sourceMappingURL=role-permission.service.js.map