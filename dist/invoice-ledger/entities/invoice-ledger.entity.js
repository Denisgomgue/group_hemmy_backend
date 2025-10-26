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
exports.InvoiceLedger = exports.EntryType = void 0;
const typeorm_1 = require("typeorm");
const invoice_entity_1 = require("../../invoice/entities/invoice.entity");
const client_entity_1 = require("../../client/entities/client.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var EntryType;
(function (EntryType) {
    EntryType["ISSUE"] = "ISSUE";
    EntryType["PAYMENT"] = "PAYMENT";
    EntryType["VOID"] = "VOID";
    EntryType["ADJUSTMENT"] = "ADJUSTMENT";
    EntryType["RECONNECT"] = "RECONNECT";
    EntryType["SUSPEND"] = "SUSPEND";
})(EntryType || (exports.EntryType = EntryType = {}));
let InvoiceLedger = class InvoiceLedger {
    id;
    entryType;
    amount;
    description;
    effectiveDate;
    created_at;
    invoice;
    client;
    user;
};
exports.InvoiceLedger = InvoiceLedger;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InvoiceLedger.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EntryType
    }),
    __metadata("design:type", String)
], InvoiceLedger.prototype, "entryType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceLedger.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], InvoiceLedger.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], InvoiceLedger.prototype, "effectiveDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], InvoiceLedger.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => invoice_entity_1.Invoice),
    (0, typeorm_1.JoinColumn)({ name: 'invoiceId' }),
    __metadata("design:type", invoice_entity_1.Invoice)
], InvoiceLedger.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", client_entity_1.Client)
], InvoiceLedger.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], InvoiceLedger.prototype, "user", void 0);
exports.InvoiceLedger = InvoiceLedger = __decorate([
    (0, typeorm_1.Entity)()
], InvoiceLedger);
//# sourceMappingURL=invoice-ledger.entity.js.map