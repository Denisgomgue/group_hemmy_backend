import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) { }

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const person = this.personRepository.create(createPersonDto);
    return await this.personRepository.save(person);
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Person | null> {
    return await this.personRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person | null> {
    await this.personRepository.update(id, updatePersonDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}
