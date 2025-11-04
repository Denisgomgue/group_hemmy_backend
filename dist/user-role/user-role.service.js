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
exports.UserRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_role_entity_1 = require("./entities/user-role.entity");
const role_entity_1 = require("../role/entities/role.entity");
const user_entity_1 = require("../users/entities/user.entity");
let UserRoleService = class UserRoleService {
    userRoleRepository;
    roleRepository;
    userRepository;
    constructor(userRoleRepository, roleRepository, userRepository) {
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }
    async create(createUserRoleDto, assignedByUserId) {
        const user = await this.userRepository.findOne({
            where: { id: createUserRoleDto.UserId },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${createUserRoleDto.UserId} no encontrado`);
        }
        const role = await this.roleRepository.findOne({
            where: { id: createUserRoleDto.roleId },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Rol con ID ${createUserRoleDto.roleId} no encontrado`);
        }
        if (role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('No se puede asignar el rol SUPERADMIN a usuarios mediante esta API. El rol SUPERADMIN solo puede ser asignado mediante seeders o por un administrador del sistema con privilegios especiales.');
        }
        const existing = await this.userRoleRepository.findOne({
            where: {
                user: { id: user.id },
                role: { id: role.id },
            },
        });
        if (existing) {
            throw new common_1.ForbiddenException(`El usuario ya tiene el rol "${role.name}" asignado`);
        }
        let assignedByUser = undefined;
        if (assignedByUserId) {
            assignedByUser = await this.userRepository.findOne({
                where: { id: assignedByUserId },
            }) || undefined;
        }
        const userRoleData = {
            user,
            role,
            assignedAt: createUserRoleDto.assignedAt || new Date(),
        };
        if (assignedByUser) {
            userRoleData.assignedByUser = assignedByUser;
        }
        const userRole = this.userRoleRepository.create(userRoleData);
        return this.userRoleRepository.save(userRole);
    }
    async findAll() {
        const results = await this.userRoleRepository.find({
            relations: ['user', 'role', 'assignedByUser'],
            order: { assignedAt: 'DESC' },
        });
        return results.map(ur => ({
            ...ur,
            UserId: ur.user?.id || ur.UserId,
            roleId: ur.role?.id || ur.roleId,
            assignedBy: ur.assignedByUser?.id || ur.assignedBy || null,
        }));
    }
    async findOne(id) {
        const userRole = await this.userRoleRepository.findOne({
            where: { id },
            relations: ['user', 'role', 'assignedByUser'],
        });
        if (!userRole) {
            throw new common_1.NotFoundException(`UserRole con ID ${id} no encontrado`);
        }
        return {
            ...userRole,
            UserId: userRole.user?.id || userRole.UserId,
            roleId: userRole.role?.id || userRole.roleId,
            assignedBy: userRole.assignedByUser?.id || userRole.assignedBy || null,
        };
    }
    async update(id, updateUserRoleDto) {
        const userRole = await this.userRoleRepository.findOne({
            where: { id },
            relations: ['user', 'role'],
        });
        if (!userRole) {
            throw new common_1.NotFoundException(`UserRole con ID ${id} no encontrado`);
        }
        if (userRole.role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('No se pueden modificar las asignaciones del rol SUPERADMIN. Este rol es inmutable por seguridad.');
        }
        if (updateUserRoleDto.roleId) {
            const newRole = await this.roleRepository.findOne({
                where: { id: updateUserRoleDto.roleId },
            });
            if (newRole && newRole.code === 'SUPERADMIN') {
                throw new common_1.ForbiddenException('No se puede asignar el rol SUPERADMIN mediante esta API. Este rol solo puede ser asignado mediante seeders.');
            }
        }
        Object.assign(userRole, updateUserRoleDto);
        return this.userRoleRepository.save(userRole);
    }
    async remove(id) {
        const userRole = await this.userRoleRepository.findOne({
            where: { id },
            relations: ['user', 'role'],
        });
        if (!userRole) {
            throw new common_1.NotFoundException(`UserRole con ID ${id} no encontrado`);
        }
        if (userRole.role.code === 'SUPERADMIN') {
            throw new common_1.ForbiddenException('No se pueden eliminar las asignaciones del rol SUPERADMIN. Este rol es inmutable por seguridad.');
        }
        return this.userRoleRepository.remove(userRole);
    }
};
exports.UserRoleService = UserRoleService;
exports.UserRoleService = UserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserRoleService);
//# sourceMappingURL=user-role.service.js.map