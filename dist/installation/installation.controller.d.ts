import { InstallationService } from './installation.service';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
export declare class InstallationController {
    private readonly installationService;
    constructor(installationService: InstallationService);
    create(createInstallationDto: CreateInstallationDto): Promise<CreateInstallationDto & import("./entities/installation.entity").Installation>;
    findAll(): Promise<import("./entities/installation.entity").Installation[]>;
    findOne(id: string): Promise<import("./entities/installation.entity").Installation | null>;
    update(id: string, updateInstallationDto: UpdateInstallationDto): Promise<import("./entities/installation.entity").Installation | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    uploadImage(id: string, file: Express.Multer.File): Promise<import("./entities/installation.entity").Installation | null>;
}
