import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentHistoryDto } from './create-equipment-history.dto';

export class UpdateEquipmentHistoryDto extends PartialType(CreateEquipmentHistoryDto) {}
