import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentCategoriesService } from './equipment-categories.service';
import { CreateEquipmentCategoryDto } from './dto/create-equipment-category.dto';
import { UpdateEquipmentCategoryDto } from './dto/update-equipment-category.dto';

@Controller('equipment-categories')
export class EquipmentCategoriesController {
  constructor(private readonly equipmentCategoriesService: EquipmentCategoriesService) {}

  @Post()
  create(@Body() createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
    return this.equipmentCategoriesService.create(createEquipmentCategoryDto);
  }

  @Get()
  findAll() {
    return this.equipmentCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentCategoryDto: UpdateEquipmentCategoryDto) {
    return this.equipmentCategoriesService.update(+id, updateEquipmentCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentCategoriesService.remove(+id);
  }
}
