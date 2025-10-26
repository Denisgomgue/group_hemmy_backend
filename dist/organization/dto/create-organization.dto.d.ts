import { OrganizationDocumentType } from '../entities/organization.entity';
export declare class CreateOrganizationDto {
    legalName: string;
    documentType: OrganizationDocumentType;
    documentNumber: string;
    representativePersonId?: number;
    email: string;
    phone?: string;
    address?: string;
}
