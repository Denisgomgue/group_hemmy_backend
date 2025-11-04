import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    // Crear el ticket con los datos del DTO
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

  async findAll(): Promise<Ticket[]> {
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

  async findOne(id: number): Promise<Ticket> {
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
      throw new NotFoundException(`Ticket con ID ${id} no encontrado`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);

    Object.assign(ticket, updateTicketDto);

    return await this.ticketRepository.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepository.remove(ticket);
  }
}
