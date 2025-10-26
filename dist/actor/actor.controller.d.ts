import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
export declare class ActorController {
    private readonly actorService;
    constructor(actorService: ActorService);
    create(createActorDto: CreateActorDto): Promise<import("./entities/actor.entity").Actor>;
    findAll(): Promise<import("./entities/actor.entity").Actor[]>;
    findOne(id: string): Promise<import("./entities/actor.entity").Actor | null>;
    update(id: string, updateActorDto: UpdateActorDto): Promise<import("./entities/actor.entity").Actor | null>;
    remove(id: string): Promise<void>;
}
