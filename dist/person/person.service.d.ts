import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
export declare class PersonService {
    private personRepository;
    constructor(personRepository: Repository<Person>);
    create(createPersonDto: CreatePersonDto): Promise<Person>;
    findAll(): Promise<Person[]>;
    findOne(id: number): Promise<Person | null>;
    update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person | null>;
    remove(id: number): Promise<void>;
}
