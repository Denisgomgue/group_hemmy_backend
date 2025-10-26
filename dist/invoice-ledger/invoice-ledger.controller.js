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
exports.InvoiceLedgerController = void 0;
const common_1 = require("@nestjs/common");
const invoice_ledger_service_1 = require("./invoice-ledger.service");
const create_invoice_ledger_dto_1 = require("./dto/create-invoice-ledger.dto");
const update_invoice_ledger_dto_1 = require("./dto/update-invoice-ledger.dto");
let InvoiceLedgerController = class InvoiceLedgerController {
    invoiceLedgerService;
    constructor(invoiceLedgerService) {
        this.invoiceLedgerService = invoiceLedgerService;
    }
    create(createInvoiceLedgerDto) {
        return this.invoiceLedgerService.create(createInvoiceLedgerDto);
    }
    findAll() {
        return this.invoiceLedgerService.findAll();
    }
    findOne(id) {
        return this.invoiceLedgerService.findOne(+id);
    }
    update(id, updateInvoiceLedgerDto) {
        return this.invoiceLedgerService.update(+id, updateInvoiceLedgerDto);
    }
    remove(id) {
        return this.invoiceLedgerService.remove(+id);
    }
};
exports.InvoiceLedgerController = InvoiceLedgerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_ledger_dto_1.CreateInvoiceLedgerDto]),
    __metadata("design:returntype", void 0)
], InvoiceLedgerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvoiceLedgerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceLedgerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_invoice_ledger_dto_1.UpdateInvoiceLedgerDto]),
    __metadata("design:returntype", void 0)
], InvoiceLedgerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvoiceLedgerController.prototype, "remove", null);
exports.InvoiceLedgerController = InvoiceLedgerController = __decorate([
    (0, common_1.Controller)('invoice-ledger'),
    __metadata("design:paramtypes", [invoice_ledger_service_1.InvoiceLedgerService])
], InvoiceLedgerController);
//# sourceMappingURL=invoice-ledger.controller.js.map