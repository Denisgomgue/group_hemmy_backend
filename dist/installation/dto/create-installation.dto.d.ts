import { InstallationStatus } from '../entities/installation.entity';
export declare class CreateInstallationDto {
    address?: string;
    ipAddress?: string;
    imagePath?: string;
    installedAt?: string;
    status: InstallationStatus;
    clientId: number;
    sectorId: number;
}
