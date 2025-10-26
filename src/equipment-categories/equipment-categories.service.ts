import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentCategoryDto } from './dto/create-equipment-category.dto';
import { UpdateEquipmentCategoryDto } from './dto/update-equipment-category.dto';
import { EquipmentCategory } from './entities/equipment-category.entity';

@Injectable()
export class EquipmentCategoriesService {
  constructor(
    @InjectRepository(EquipmentCategory)
    private equipmentCategoryRepository: Repository<EquipmentCategory>,
  ) { }

  async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto): Promise<EquipmentCategory> {
    const category = this.equipmentCategoryRepository.create(createEquipmentCategoryDto);
    return await this.equipmentCategoryRepository.save(category);
  }

  async findAll(): Promise<EquipmentCategory[]> {
    return await this.equipmentCategoryRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<EquipmentCategory | null> {
    return await this.equipmentCategoryRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateEquipmentCategoryDto: UpdateEquipmentCategoryDto): Promise<EquipmentCategory | null> {
    await this.equipmentCategoryRepository.update(id, updateEquipmentCategoryDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipmentCategoryRepository.delete(id);
  }
}
