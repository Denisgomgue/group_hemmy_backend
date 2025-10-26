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
exports.Organization = exports.OrganizationDocumentType = void 0;
const typeorm_1 = require("typeorm");
const person_entity_1 = require("../../person/entities/person.entity");
var OrganizationDocumentType;
(function (OrganizationDocumentType) {
    OrganizationDocumentType["RUC"] = "RUC";
})(OrganizationDocumentType || (exports.OrganizationDocumentType = OrganizationDocumentType = {}));
let Organization = class Organization {
    id;
    legalName;
    documentType;
    documentNumber;
    email;
    phone;
    address;
    created_at;
    updated_at;
    representativePerson;
};
exports.Organization = Organization;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "legalName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrganizationDocumentType,
        nullable: true
    }),
    __metadata("design:type", String)
], Organization.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], Organization.prototype, "documentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", String)
], Organization.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Organization.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Organization.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.Person),
    (0, typeorm_1.JoinColumn)({ name: 'representativePersonId' }),
    __metadata("design:type", person_entity_1.Person)
], Organization.prototype, "representativePerson", void 0);
exports.Organization = Organization = __decorate([
    (0, typeorm_1.Entity)()
], Organization);
//# sourceMappingURL=organization.entity.js.map