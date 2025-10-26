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
exports.Ticket = exports.CreatedAsRole = exports.TicketOutcome = exports.TicketStatus = exports.TicketPriority = exports.TicketType = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../client/entities/client.entity");
const installation_entity_1 = require("../../installation/entities/installation.entity");
const employee_entity_1 = require("../../employee/entities/employee.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var TicketType;
(function (TicketType) {
    TicketType["TECHNICAL"] = "TECHNICAL";
    TicketType["BILLING"] = "BILLING";
    TicketType["COMPLAINT"] = "COMPLAINT";
    TicketType["REQUEST"] = "REQUEST";
    TicketType["OTHER"] = "OTHER";
})(TicketType || (exports.TicketType = TicketType = {}));
var TicketPriority;
(function (TicketPriority) {
    TicketPriority["LOW"] = "LOW";
    TicketPriority["MEDIUM"] = "MEDIUM";
    TicketPriority["HIGH"] = "HIGH";
    TicketPriority["URGENT"] = "URGENT";
})(TicketPriority || (exports.TicketPriority = TicketPriority = {}));
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["OPEN"] = "OPEN";
    TicketStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TicketStatus["PENDING"] = "PENDING";
    TicketStatus["RESOLVED"] = "RESOLVED";
    TicketStatus["CLOSED"] = "CLOSED";
    TicketStatus["CANCELLED"] = "CANCELLED";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
var TicketOutcome;
(function (TicketOutcome) {
    TicketOutcome["RESOLVED"] = "RESOLVED";
    TicketOutcome["NOT_RESOLVED"] = "NOT_RESOLVED";
    TicketOutcome["DUPLICATE"] = "DUPLICATE";
    TicketOutcome["CANCELLED"] = "CANCELLED";
    TicketOutcome["ESCALATED"] = "ESCALATED";
})(TicketOutcome || (exports.TicketOutcome = TicketOutcome = {}));
var CreatedAsRole;
(function (CreatedAsRole) {
    CreatedAsRole["CUSTOMER"] = "CUSTOMER";
    CreatedAsRole["TECH"] = "TECH";
    CreatedAsRole["ADMIN"] = "ADMIN";
})(CreatedAsRole || (exports.CreatedAsRole = CreatedAsRole = {}));
let Ticket = class Ticket {
    id;
    typeCode;
    priorityCode;
    statusCode;
    subject;
    description;
    scheduledStart;
    outcome;
    openedAt;
    closedAt;
    createdAsRole;
    created_at;
    updated_at;
    client;
    installation;
    employee;
    createdByUser;
};
exports.Ticket = Ticket;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketType
    }),
    __metadata("design:type", String)
], Ticket.prototype, "typeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketPriority,
        default: TicketPriority.MEDIUM
    }),
    __metadata("design:type", String)
], Ticket.prototype, "priorityCode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.OPEN
    }),
    __metadata("design:type", String)
], Ticket.prototype, "statusCode", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Ticket.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Ticket.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "scheduledStart", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: TicketOutcome,
        nullable: true
    }),
    __metadata("design:type", String)
], Ticket.prototype, "outcome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Ticket.prototype, "openedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Ticket.prototype, "closedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CreatedAsRole,
        default: CreatedAsRole.CUSTOMER
    }),
    __metadata("design:type", String)
], Ticket.prototype, "createdAsRole", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Ticket.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Ticket.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", client_entity_1.Client)
], Ticket.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => installation_entity_1.Installation),
    (0, typeorm_1.JoinColumn)({ name: 'installationId' }),
    __metadata("design:type", installation_entity_1.Installation)
], Ticket.prototype, "installation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Ticket.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'createdByUserId' }),
    __metadata("design:type", user_entity_1.User)
], Ticket.prototype, "createdByUser", void 0);
exports.Ticket = Ticket = __decorate([
    (0, typeorm_1.Entity)()
], Ticket);
//# sourceMappingURL=ticket.entity.js.map