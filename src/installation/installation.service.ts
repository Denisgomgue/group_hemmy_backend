import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { Installation } from './entities/installation.entity';

@Injectable()
export class InstallationService {
  constructor(
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
  ) { }

  async create(createInstallationDto: CreateInstallationDto) {
    return await this.installationRepository.save(createInstallationDto);
  }

  async findAll() {
    return await this.installationRepository.find({
      relations: [ 'client', 'sector' ],
    });
  }

  async findOne(id: number) {
    return await this.installationRepository.findOne({
      where: { id },
      relations: [ 'client', 'sector' ],
    });
  }

  async update(id: number, updateInstallationDto: UpdateInstallationDto) {
    await this.installationRepository.update(id, updateInstallationDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.installationRepository.delete(id);
  }
}
