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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("./entities/permission.entity");
let PermissionService = class PermissionService {
    permissionRepository;
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(createPermissionDto) {
        const permission = this.permissionRepository.create(createPermissionDto);
        return await this.permissionRepository.save(permission);
    }
    async findByResourceId(resourceId) {
        return await this.permissionRepository.find({
            where: { resourceId },
            relations: ['resource'],
            order: { created_at: 'ASC' },
        });
    }
    async findAll() {
        return await this.permissionRepository.find({
            relations: ['resource'],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const permission = await this.permissionRepository.findOne({
            where: { id },
            relations: ['resource'],
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permiso con ID ${id} no encontrado`);
        }
        return permission;
    }
    async update(id, updatePermissionDto) {
        const permission = await this.findOne(id);
        Object.assign(permission, updatePermissionDto);
        return await this.permissionRepository.save(permission);
    }
    async remove(id) {
        const permission = await this.findOne(id);
        await this.permissionRepository.remove(permission);
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map