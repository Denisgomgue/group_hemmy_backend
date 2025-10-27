import { Injectable } from '@nestjs/common';
import { CreateInstallationEquipmentDto } from './dto/create-installation-equipment.dto';
import { UpdateInstallationEquipmentDto } from './dto/update-installation-equipment.dto';

@Injectable()
export class InstallationEquipmentService {
    create(createInstallationEquipmentDto: CreateInstallationEquipmentDto) {
        return 'This action adds a new installationEquipment';
    }

    findAll() {
        return `This action returns all installationEquipment`;
    }

    findOne(id: number) {
        return `This action returns a #${id} installationEquipment`;
    }

    update(id: number, updateInstallationEquipmentDto: UpdateInstallationEquipmentDto) {
        return `This action updates a #${id} installationEquipment`;
    }

    remove(id: number) {
        return `This action removes a #${id} installationEquipment`;
    }
}
