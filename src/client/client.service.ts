import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) { }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    // Usar insert directamente para asegurar que las foreign keys se guarden
    const clientData: any = {
      status: createClientDto.status,
      actorId: createClientDto.actorId,
    };

    const insertResult = await this.clientRepository.insert(clientData);
    const clientId = insertResult.identifiers[ 0 ].id;

    // Cargar el cliente con sus relaciones
    const savedClient = await this.clientRepository.findOne({
      where: { id: clientId },
      relations: [ 'actor', 'actor.person', 'actor.organization' ],
    });

    if (!savedClient) {
      throw new Error('Error al crear el cliente');
    }

    return savedClient;
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: [ 'actor', 'actor.person', 'actor.organization' ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Client | null> {
    return await this.clientRepository.findOne({
      where: { id },
      relations: [ 'actor', 'actor.person', 'actor.organization' ],
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client | null> {
    await this.clientRepository.update(id, updateClientDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }
}
