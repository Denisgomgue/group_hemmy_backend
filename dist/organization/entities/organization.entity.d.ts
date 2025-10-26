import { Person } from '../../person/entities/person.entity';
export declare enum OrganizationDocumentType {
    RUC = "RUC"
}
export declare class Organization {
    id: number;
    legalName: string;
    documentType: OrganizationDocumentType;
    documentNumber: string;
    email: string;
    phone: string;
    address: string;
    created_at: Date;
    updated_at: Date;
    representativePerson: Person;
}
