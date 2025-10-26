import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentCategoriesService } from './equipment-categories.service';
import { EquipmentCategoriesController } from './equipment-categories.controller';
import { EquipmentCategory } from './entities/equipment-category.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ EquipmentCategory ]) ],
  controllers: [ EquipmentCategoriesController ],
  providers: [ EquipmentCategoriesService ],
  exports: [ EquipmentCategoriesService ],
})
export class EquipmentCategoriesModule { }
