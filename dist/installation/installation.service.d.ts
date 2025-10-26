import { CreateInstallationDto } from './dto/create-installation.dto';
import { UpdateInstallationDto } from './dto/update-installation.dto';
export declare class InstallationService {
    create(createInstallationDto: CreateInstallationDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInstallationDto: UpdateInstallationDto): string;
    remove(id: number): string;
}
