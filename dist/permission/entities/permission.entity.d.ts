import { Resource } from '../../resource/entities/resource.entity';
export declare class Permission {
    id: number;
    code: string;
    name: string;
    description: string;
    resourceId: number;
    resource: Resource;
    created_at: Date;
    updated_at: Date;
}
