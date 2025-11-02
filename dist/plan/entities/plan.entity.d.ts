import { Service } from '../../service/entities/service.entity';
export declare class Plan {
    id: number;
    name: string;
    price: number;
    speedMbps: number;
    description: string;
    isActive: boolean;
    type: boolean;
    serviceId: number;
    created_at: Date;
    updated_at: Date;
    service: Service;
}
