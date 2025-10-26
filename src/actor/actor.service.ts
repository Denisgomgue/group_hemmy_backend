import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
  ) { }

  async create(createActorDto: CreateActorDto): Promise<Actor> {
    const actor = this.actorRepository.create(createActorDto);
    return await this.actorRepository.save(actor);
  }

  async findAll(): Promise<Actor[]> {
    return await this.actorRepository.find({
      relations: [ 'person', 'organization' ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Actor | null> {
    return await this.actorRepository.findOne({
      where: { id },
      relations: [ 'person', 'organization' ],
    });
  }

  async update(id: number, updateActorDto: UpdateActorDto): Promise<Actor | null> {
    await this.actorRepository.update(id, updateActorDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.actorRepository.delete(id);
  }
}
