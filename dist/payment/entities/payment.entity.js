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
exports.Payment = exports.PaymentMethodCode = exports.PaymentStatusCode = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../client/entities/client.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var PaymentStatusCode;
(function (PaymentStatusCode) {
    PaymentStatusCode["PENDING"] = "PENDING";
    PaymentStatusCode["PAID"] = "PAID";
    PaymentStatusCode["OVERDUE"] = "OVERDUE";
    PaymentStatusCode["REFUNDED"] = "REFUNDED";
})(PaymentStatusCode || (exports.PaymentStatusCode = PaymentStatusCode = {}));
var PaymentMethodCode;
(function (PaymentMethodCode) {
    PaymentMethodCode["CASH"] = "CASH";
    PaymentMethodCode["TRANSFER"] = "TRANSFER";
    PaymentMethodCode["YAPE"] = "YAPE";
    PaymentMethodCode["PLIN"] = "PLIN";
    PaymentMethodCode["OTHER"] = "OTHER";
})(PaymentMethodCode || (exports.PaymentMethodCode = PaymentMethodCode = {}));
let Payment = class Payment {
    id;
    statusCode;
    paymentDate;
    scheduledDueDate;
    amountTotal;
    methodCode;
    reference;
    isVoid;
    voidReason;
    voidedAt;
    created_at;
    updated_at;
    client;
    createdByUser;
    voidedByUser;
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentStatusCode
    }),
    __metadata("design:type", String)
], Payment.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Payment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Payment.prototype, "scheduledDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "amountTotal", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentMethodCode,
        nullable: true
    }),
    __metadata("design:type", String)
], Payment.prototype, "methodCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Payment.prototype, "isVoid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "voidReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Payment.prototype, "voidedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Payment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Payment.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", client_entity_1.Client)
], Payment.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdByUserId' }),
    __metadata("design:type", user_entity_1.User)
], Payment.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'voidedByUserId' }),
    __metadata("design:type", user_entity_1.User)
], Payment.prototype, "voidedByUser", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)()
], Payment);
//# sourceMappingURL=payment.entity.js.map