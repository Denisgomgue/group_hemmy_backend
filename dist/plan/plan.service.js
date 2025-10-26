"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanService = void 0;
const common_1 = require("@nestjs/common");
let PlanService = class PlanService {
    create(createPlanDto) {
        return 'This action adds a new plan';
    }
    findAll() {
        return `This action returns all plan`;
    }
    findOne(id) {
        return `This action returns a #${id} plan`;
    }
    update(id, updatePlanDto) {
        return `This action updates a #${id} plan`;
    }
    remove(id) {
        return `This action removes a #${id} plan`;
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)()
], PlanService);
//# sourceMappingURL=plan.service.js.map