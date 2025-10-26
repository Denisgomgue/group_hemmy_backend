import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
export declare class SectorService {
    create(createSectorDto: CreateSectorDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSectorDto: UpdateSectorDto): string;
    remove(id: number): string;
}
