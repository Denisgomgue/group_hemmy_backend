import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
export declare class ClientService {
    private clientRepository;
    constructor(clientRepository: Repository<Client>);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client | null>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<Client | null>;
    remove(id: number): Promise<void>;
}
