import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private equipmentRepository: Repository<Equipment>,
  ) { }

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    const equipment = this.equipmentRepository.create(createEquipmentDto);
    return await this.equipmentRepository.save(equipment);
  }

  async findAll(): Promise<Equipment[]> {
    return await this.equipmentRepository.find({
      relations: [ 'category' ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Equipment | null> {
    return await this.equipmentRepository.findOne({
      where: { id },
      relations: [ 'category' ],
    });
  }

  async update(id: number, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment | null> {
    await this.equipmentRepository.update(id, updateEquipmentDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipmentRepository.delete(id);
  }
}
