import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentHistoryDto } from './dto/create-equipment-history.dto';
import { UpdateEquipmentHistoryDto } from './dto/update-equipment-history.dto';
import { EquipmentHistory } from './entities/equipment-history.entity';

@Injectable()
export class EquipmentHistoryService {
  constructor(
    @InjectRepository(EquipmentHistory)
    private equipmentHistoryRepository: Repository<EquipmentHistory>,
  ) { }

  async create(createEquipmentHistoryDto: CreateEquipmentHistoryDto): Promise<EquipmentHistory> {
    const history = this.equipmentHistoryRepository.create(createEquipmentHistoryDto);
    return await this.equipmentHistoryRepository.save(history);
  }

  async findAll(): Promise<EquipmentHistory[]> {
    return await this.equipmentHistoryRepository.find({
      relations: [ 'equipment' ],
      order: { actionDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<EquipmentHistory | null> {
    return await this.equipmentHistoryRepository.findOne({
      where: { id },
      relations: [ 'equipment' ],
    });
  }

  async update(id: number, updateEquipmentHistoryDto: UpdateEquipmentHistoryDto): Promise<EquipmentHistory | null> {
    await this.equipmentHistoryRepository.update(id, updateEquipmentHistoryDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipmentHistoryRepository.delete(id);
  }
}
