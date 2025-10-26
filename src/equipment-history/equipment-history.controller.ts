import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentHistoryService } from './equipment-history.service';
import { CreateEquipmentHistoryDto } from './dto/create-equipment-history.dto';
import { UpdateEquipmentHistoryDto } from './dto/update-equipment-history.dto';

@Controller('equipment-history')
export class EquipmentHistoryController {
  constructor(private readonly equipmentHistoryService: EquipmentHistoryService) {}

  @Post()
  create(@Body() createEquipmentHistoryDto: CreateEquipmentHistoryDto) {
    return this.equipmentHistoryService.create(createEquipmentHistoryDto);
  }

  @Get()
  findAll() {
    return this.equipmentHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentHistoryDto: UpdateEquipmentHistoryDto) {
    return this.equipmentHistoryService.update(+id, updateEquipmentHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentHistoryService.remove(+id);
  }
}
