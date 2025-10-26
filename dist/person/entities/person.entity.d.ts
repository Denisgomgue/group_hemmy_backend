export declare enum DocumentType {
    DNI = "DNI"
}
export declare class Person {
    id: number;
    documentType: DocumentType;
    documentNumber: string;
    firstName: string;
    lastName: string;
    birthdate: Date;
    email: string;
    phone: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}
