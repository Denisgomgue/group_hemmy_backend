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
exports.Actor = exports.ActorKind = void 0;
const typeorm_1 = require("typeorm");
const person_entity_1 = require("../../person/entities/person.entity");
const organization_entity_1 = require("../../organization/entities/organization.entity");
var ActorKind;
(function (ActorKind) {
    ActorKind["PERSON"] = "PERSON";
    ActorKind["ORGANIZATION"] = "ORGANIZATION";
})(ActorKind || (exports.ActorKind = ActorKind = {}));
let Actor = class Actor {
    id;
    kind;
    displayName;
    created_at;
    updated_at;
    person;
    organization;
};
exports.Actor = Actor;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Actor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActorKind,
        nullable: true
    }),
    __metadata("design:type", String)
], Actor.prototype, "kind", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Actor.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Actor.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Actor.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => person_entity_1.Person, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'personId' }),
    __metadata("design:type", person_entity_1.Person)
], Actor.prototype, "person", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => organization_entity_1.Organization, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'organizationId' }),
    __metadata("design:type", organization_entity_1.Organization)
], Actor.prototype, "organization", void 0);
exports.Actor = Actor = __decorate([
    (0, typeorm_1.Entity)()
], Actor);
//# sourceMappingURL=actor.entity.js.map