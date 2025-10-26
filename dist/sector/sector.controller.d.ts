import { SectorService } from './sector.service';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
export declare class SectorController {
    private readonly sectorService;
    constructor(sectorService: SectorService);
    create(createSectorDto: CreateSectorDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSectorDto: UpdateSectorDto): string;
    remove(id: string): string;
}
