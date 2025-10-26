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
exports.RolePermissionController = void 0;
const common_1 = require("@nestjs/common");
const role_permission_service_1 = require("./role-permission.service");
const create_role_permission_dto_1 = require("./dto/create-role-permission.dto");
const update_role_permission_dto_1 = require("./dto/update-role-permission.dto");
let RolePermissionController = class RolePermissionController {
    rolePermissionService;
    constructor(rolePermissionService) {
        this.rolePermissionService = rolePermissionService;
    }
    create(createRolePermissionDto) {
        return this.rolePermissionService.create(createRolePermissionDto);
    }
    findAll() {
        return this.rolePermissionService.findAll();
    }
    findOne(id) {
        return this.rolePermissionService.findOne(+id);
    }
    update(id, updateRolePermissionDto) {
        return this.rolePermissionService.update(+id, updateRolePermissionDto);
    }
    remove(id) {
        return this.rolePermissionService.remove(+id);
    }
};
exports.RolePermissionController = RolePermissionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_permission_dto_1.CreateRolePermissionDto]),
    __metadata("design:returntype", void 0)
], RolePermissionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RolePermissionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolePermissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_permission_dto_1.UpdateRolePermissionDto]),
    __metadata("design:returntype", void 0)
], RolePermissionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RolePermissionController.prototype, "remove", null);
exports.RolePermissionController = RolePermissionController = __decorate([
    (0, common_1.Controller)('role-permission'),
    __metadata("design:paramtypes", [role_permission_service_1.RolePermissionService])
], RolePermissionController);
//# sourceMappingURL=role-permission.controller.js.map