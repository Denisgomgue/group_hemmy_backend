import { InstallationService } from './installation.service';
import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
export declare class InstallationController {
    private readonly installationService;
    constructor(installationService: InstallationService);
    create(createInstallationDto: CreateInstallationDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInstallationDto: UpdateInstallationDto): string;
    remove(id: string): string;
}
