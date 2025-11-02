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
    // Crear el actor directamente usando insert para asegurar que las foreign keys se guarden
    const actorData: any = {
      kind: createActorDto.kind,
      displayName: createActorDto.displayName,
    };

    // Asignar personId u organizationId según corresponda
    // TypeORM necesita estos valores directamente en el objeto cuando usamos @JoinColumn
    if (createActorDto.personId) {
      actorData.personId = createActorDto.personId;
    }
    if (createActorDto.organizationId) {
      actorData.organizationId = createActorDto.organizationId;
    }

    // Usar insert directamente para asegurar que las foreign keys se guarden
    const insertResult = await this.actorRepository.insert(actorData);
    const actorId = insertResult.identifiers[ 0 ].id;

    // Cargar el actor con sus relaciones
    const savedActor = await this.actorRepository.findOne({
      where: { id: actorId },
      relations: [ 'person', 'organization' ],
    });

    if (!savedActor) {
      throw new Error('Error al crear el actor');
    }

    return savedActor;
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
