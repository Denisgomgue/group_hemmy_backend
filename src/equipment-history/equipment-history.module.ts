import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentHistoryService } from './equipment-history.service';
import { EquipmentHistoryController } from './equipment-history.controller';
import { EquipmentHistory } from './entities/equipment-history.entity';
import { Installation } from '../installation/entities/installation.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ EquipmentHistory, Installation ]) ],
  controllers: [ EquipmentHistoryController ],
  providers: [ EquipmentHistoryService ],
  exports: [ EquipmentHistoryService ],
})
export class EquipmentHistoryModule { }
