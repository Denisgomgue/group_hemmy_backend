import { Repository } from 'typeorm';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
import { Installation } from './entities/installation.entity';
export declare class InstallationService {
    private installationRepository;
    constructor(installationRepository: Repository<Installation>);
    create(createInstallationDto: CreateInstallationDto): Promise<CreateInstallationDto & Installation>;
    findAll(): Promise<Installation[]>;
    findOne(id: number): Promise<Installation | null>;
    update(id: number, updateInstallationDto: UpdateInstallationDto): Promise<Installation | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
