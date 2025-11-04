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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
let TicketService = class TicketService {
    ticketRepository;
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    async create(createTicketDto) {
        const ticket = this.ticketRepository.create({
            clientId: createTicketDto.clientId,
            typeCode: createTicketDto.typeCode,
            priorityCode: createTicketDto.priorityCode ?? undefined,
            statusCode: createTicketDto.statusCode ?? undefined,
            subject: createTicketDto.subject,
            description: createTicketDto.description ?? undefined,
            employeeId: createTicketDto.employeeId ?? undefined,
            installationId: createTicketDto.installationId ?? undefined,
            createdByUserId: createTicketDto.createdByUserId,
            createdAsRole: createTicketDto.createdAsRole ?? undefined,
            outcome: createTicketDto.outcome ?? undefined,
            openedAt: new Date(createTicketDto.openedAt),
            closedAt: createTicketDto.closedAt ? new Date(createTicketDto.closedAt) : undefined,
            scheduledStart: createTicketDto.scheduledStart ? new Date(createTicketDto.scheduledStart) : undefined,
        });
        return await this.ticketRepository.save(ticket);
    }
    async findAll() {
        return await this.ticketRepository.find({
            relations: [
                'client',
                'client.actor',
                'client.actor.person',
                'client.actor.organization',
                'installation',
                'installation.client',
                'installation.client.actor',
                'employee',
                'employee.person',
                'createdByUser',
            ],
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: [
                'client',
                'client.actor',
                'client.actor.person',
                'client.actor.organization',
                'installation',
                'installation.client',
                'installation.client.actor',
                'employee',
                'employee.person',
                'createdByUser',
            ],
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket con ID ${id} no encontrado`);
        }
        return ticket;
    }
    async update(id, updateTicketDto) {
        const ticket = await this.findOne(id);
        Object.assign(ticket, updateTicketDto);
        return await this.ticketRepository.save(ticket);
    }
    async remove(id) {
        const ticket = await this.findOne(id);
        await this.ticketRepository.remove(ticket);
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TicketService);
//# sourceMappingURL=ticket.service.js.map