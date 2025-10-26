import { DocumentType } from '../entities/person.entity';
export declare class CreatePersonDto {
    documentType: DocumentType;
    documentNumber: string;
    firstName: string;
    lastName: string;
    birthdate?: string;
    email: string;
    phone?: string;
    address?: string;
}
