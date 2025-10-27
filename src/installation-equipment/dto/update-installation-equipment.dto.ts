import { PartialType } from '@nestjs/mapped-types';
import { CreateInstallationEquipmentDto } from './create-installation-equipment.dto';

export class UpdateInstallationEquipmentDto extends PartialType(CreateInstallationEquipmentDto) { }
