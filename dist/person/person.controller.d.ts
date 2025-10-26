import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    create(createPersonDto: CreatePersonDto): Promise<import("./entities/person.entity").Person>;
    findAll(): Promise<import("./entities/person.entity").Person[]>;
    findOne(id: string): Promise<import("./entities/person.entity").Person | null>;
    update(id: string, updatePersonDto: UpdatePersonDto): Promise<import("./entities/person.entity").Person | null>;
    remove(id: string): Promise<void>;
}
