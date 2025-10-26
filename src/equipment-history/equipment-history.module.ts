import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentHistoryService } from './equipment-history.service';
import { EquipmentHistoryController } from './equipment-history.controller';
import { EquipmentHistory } from './entities/equipment-history.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ EquipmentHistory ]) ],
  controllers: [ EquipmentHistoryController ],
  providers: [ EquipmentHistoryService ],
  exports: [ EquipmentHistoryService ],
})
export class EquipmentHistoryModule { }
