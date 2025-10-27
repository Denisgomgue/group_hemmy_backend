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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = exports.ChargeTypeCode = void 0;
const typeorm_1 = require("typeorm");
const service_entity_1 = require("../../service/entities/service.entity");
const plan_entity_1 = require("../../plan/entities/plan.entity");
const invoice_entity_1 = require("../../invoice/entities/invoice.entity");
var ChargeTypeCode;
(function (ChargeTypeCode) {
    ChargeTypeCode["SUBSCRIPTION"] = "SUBSCRIPTION";
    ChargeTypeCode["ADDON"] = "ADDON";
    ChargeTypeCode["RECONNECTION"] = "RECONNECTION";
    ChargeTypeCode["DISCOUNT"] = "DISCOUNT";
    ChargeTypeCode["OTHER"] = "OTHER";
})(ChargeTypeCode || (exports.ChargeTypeCode = ChargeTypeCode = {}));
let InvoiceItem = class InvoiceItem {
    id;
    lineNumber;
    chargeTypeCode;
    description;
    quantity;
    unitPrice;
    lineTotal;
    created_at;
    invoice;
    service;
    plan;
};
exports.InvoiceItem = InvoiceItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "lineNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ChargeTypeCode,
        nullable: true
    }),
    __metadata("design:type", String)
], InvoiceItem.prototype, "chargeTypeCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], InvoiceItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 3, default: 1.000 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "unitPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceItem.prototype, "lineTotal", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], InvoiceItem.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    __metadata("design:type", invoice_entity_1.Invoice)
], InvoiceItem.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service),
    (0, typeorm_1.JoinColumn)({ name: 'serviceId' }),
    __metadata("design:type", service_entity_1.Service)
], InvoiceItem.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plan_entity_1.Plan),
    (0, typeorm_1.JoinColumn)({ name: 'planId' }),
    __metadata("design:type", plan_entity_1.Plan)
], InvoiceItem.prototype, "plan", void 0);
exports.InvoiceItem = InvoiceItem = __decorate([
    (0, typeorm_1.Entity)()
], InvoiceItem);
//# sourceMappingURL=invoice-item.entity.js.map