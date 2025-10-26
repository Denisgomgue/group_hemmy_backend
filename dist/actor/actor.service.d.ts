import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actor.entity';
export declare class ActorService {
    private actorRepository;
    constructor(actorRepository: Repository<Actor>);
    create(createActorDto: CreateActorDto): Promise<Actor>;
    findAll(): Promise<Actor[]>;
    findOne(id: number): Promise<Actor | null>;
    update(id: number, updateActorDto: UpdateActorDto): Promise<Actor | null>;
    remove(id: number): Promise<void>;
}
