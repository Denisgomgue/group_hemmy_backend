import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentHistoryDto } from './dto/create-equipment-history.dto';
import { UpdateEquipmentHistoryDto } from './dto/update-equipment-history.dto';
import { EquipmentHistory, ActionType } from './entities/equipment-history.entity';
import { Installation } from '../installation/entities/installation.entity';

@Injectable()
export class EquipmentHistoryService {
  constructor(
    @InjectRepository(EquipmentHistory)
    private equipmentHistoryRepository: Repository<EquipmentHistory>,
    @InjectRepository(Installation)
    private installationRepository: Repository<Installation>,
  ) { }

  async create(createEquipmentHistoryDto: CreateEquipmentHistoryDto): Promise<EquipmentHistory> {
    const history = this.equipmentHistoryRepository.create(createEquipmentHistoryDto);
    return await this.equipmentHistoryRepository.save(history);
  }

  // Método para crear histórico automáticamente basado en sectores
  async createAutomatic(
    equipmentId: number,
    actionType: ActionType,
    fromInstallationId: number | null,
    toInstallationId: number | null,
    performedBy: number,
  ): Promise<EquipmentHistory> {
    let fromSector: any = null;
    let toSector: any = null;

    // Obtener sectores desde las instalaciones
    if (fromInstallationId) {
      const fromInstallation = await this.installationRepository.findOne({
        where: { id: fromInstallationId },
        relations: [ 'sector' ]
      });
      if (fromInstallation) {
        fromSector = fromInstallation.sector;
      }
    }

    if (toInstallationId) {
      const toInstallation = await this.installationRepository.findOne({
        where: { id: toInstallationId },
        relations: [ 'sector' ]
      });
      if (toInstallation) {
        toSector = toInstallation.sector;
      }
    }

    const history = new EquipmentHistory();
    history.actionType = actionType;
    history.equipment = { id: equipmentId } as any;
    history.fromSector = fromSector;
    history.toSector = toSector;
    if (fromInstallationId !== null) {
      history.fromInstallationId = fromInstallationId;
    }
    if (toInstallationId !== null) {
      history.toInstallationId = toInstallationId;
    }
    history.user = { id: performedBy } as any;
    history.actionDate = new Date();

    return await this.equipmentHistoryRepository.save(history);
  }

  async findAll(): Promise<EquipmentHistory[]> {
    return await this.equipmentHistoryRepository.find({
      relations: [ 'equipment', 'fromSector', 'toSector', 'user' ],
      order: { actionDate: 'DESC' },
    });
  }

  async findOne(id: number): Promise<EquipmentHistory | null> {
    return await this.equipmentHistoryRepository.findOne({
      where: { id },
      relations: [ 'equipment', 'fromSector', 'toSector', 'user' ],
    });
  }

  async update(id: number, updateEquipmentHistoryDto: UpdateEquipmentHistoryDto): Promise<EquipmentHistory | null> {
    await this.equipmentHistoryRepository.update(id, updateEquipmentHistoryDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.equipmentHistoryRepository.delete(id);
  }
}
