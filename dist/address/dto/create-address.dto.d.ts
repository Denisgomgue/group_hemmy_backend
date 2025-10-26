import { AddressType } from '../entities/address.entity';
export declare class CreateAddressDto {
    addressType: AddressType;
    addressLine?: string;
    reference?: string;
    country?: string;
    region?: string;
    province?: string;
    district?: string;
    city?: string;
    locality?: string;
    ubigeo?: string;
    isPrimary?: boolean;
    validFrom?: string;
    validTo?: string;
    actorId?: number;
    installationId?: number;
}
