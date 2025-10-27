import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InstallationEquipmentService } from './installation-equipment.service';
import { CreateInstallationEquipmentDto } from './dto/create-installation-equipment.dto';
import { UpdateInstallationEquipmentDto } from './dto/update-installation-equipment.dto';

@Controller('installation-equipment')
export class InstallationEquipmentController {
    constructor(private readonly installationEquipmentService: InstallationEquipmentService) { }

    @Post()
    create(@Body() createInstallationEquipmentDto: CreateInstallationEquipmentDto) {
        return this.installationEquipmentService.create(createInstallationEquipmentDto);
    }

    @Get()
    findAll() {
        return this.installationEquipmentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.installationEquipmentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateInstallationEquipmentDto: UpdateInstallationEquipmentDto) {
        return this.installationEquipmentService.update(+id, updateInstallationEquipmentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.installationEquipmentService.remove(+id);
    }
}
