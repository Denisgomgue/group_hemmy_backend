import { Actor } from '../../actor/entities/actor.entity';
import { Installation } from '../../installation/entities/installation.entity';
export declare enum AddressType {
    FISCAL = "FISCAL",
    SERVICE = "SERVICE",
    BILLING = "BILLING",
    NOTIFICATION = "NOTIFICATION",
    OTHER = "OTHER"
}
export declare class Address {
    id: number;
    addressType: AddressType;
    addressLine: string;
    reference: string;
    country: string;
    region: string;
    province: string;
    district: string;
    city: string;
    locality: string;
    ubigeo: string;
    isPrimary: boolean;
    validFrom: Date;
    validTo: Date;
    created_at: Date;
    updated_at: Date;
    actor: Actor;
    installation: Installation;
}
