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
exports.InstallationController = void 0;
const common_1 = require("@nestjs/common");
const installation_service_1 = require("./installation.service");
const create_installation_dto_1 = require("./dto/create-installation.dto");
const update_installation_dto_1 = require("./dto/update-installation.dto");
let InstallationController = class InstallationController {
    installationService;
    constructor(installationService) {
        this.installationService = installationService;
    }
    create(createInstallationDto) {
        return this.installationService.create(createInstallationDto);
    }
    findAll() {
        return this.installationService.findAll();
    }
    findOne(id) {
        return this.installationService.findOne(+id);
    }
    update(id, updateInstallationDto) {
        return this.installationService.update(+id, updateInstallationDto);
    }
    remove(id) {
        return this.installationService.remove(+id);
    }
};
exports.InstallationController = InstallationController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_installation_dto_1.CreateInstallationDto]),
    __metadata("design:returntype", void 0)
], InstallationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstallationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstallationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_installation_dto_1.UpdateInstallationDto]),
    __metadata("design:returntype", void 0)
], InstallationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstallationController.prototype, "remove", null);
exports.InstallationController = InstallationController = __decorate([
    (0, common_1.Controller)('installation'),
    __metadata("design:paramtypes", [installation_service_1.InstallationService])
], InstallationController);
//# sourceMappingURL=installation.controller.js.map