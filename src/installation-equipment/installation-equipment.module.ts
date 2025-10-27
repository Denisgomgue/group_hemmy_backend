import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallationEquipmentService } from './installation-equipment.service';
import { InstallationEquipmentController } from './installation-equipment.controller';
import { InstallationEquipment } from './entities/installation-equipment.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ InstallationEquipment ]) ],
    controllers: [ InstallationEquipmentController ],
    providers: [ InstallationEquipmentService ],
    exports: [ InstallationEquipmentService ],
})
export class InstallationEquipmentModule { }
