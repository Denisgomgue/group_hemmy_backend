import { Client } from '../../client/entities/client.entity';
import { Sector } from '../../sector/entities/sector.entity';
export declare enum InstallationStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Installation {
    id: number;
    address: string;
    ipAddress: string;
    imagePath: string;
    installedAt: Date;
    status: InstallationStatus;
    created_at: Date;
    updated_at: Date;
    client: Client;
    sector: Sector;
}
