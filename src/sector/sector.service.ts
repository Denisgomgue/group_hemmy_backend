import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { Sector } from './entities/sector.entity';

@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) { }

  async create(createSectorDto: CreateSectorDto): Promise<Sector> {
    const sector = this.sectorRepository.create(createSectorDto);
    return await this.sectorRepository.save(sector);
  }

  async findAll(): Promise<Sector[]> {
    return await this.sectorRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Sector> {
    const sector = await this.sectorRepository.findOne({
      where: { id },
    });

    if (!sector) {
      throw new NotFoundException(`Sector con ID ${id} no encontrado`);
    }

    return sector;
  }

  async update(id: number, updateSectorDto: UpdateSectorDto): Promise<Sector> {
    const sector = await this.findOne(id);

    Object.assign(sector, updateSectorDto);

    return await this.sectorRepository.save(sector);
  }

  async remove(id: number): Promise<void> {
    const sector = await this.findOne(id);
    await this.sectorRepository.remove(sector);
  }
}
