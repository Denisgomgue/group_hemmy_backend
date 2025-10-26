import { EntryType } from '../entities/invoice-ledger.entity';
export declare class CreateInvoiceLedgerDto {
    invoiceId: number;
    clientId: number;
    userId?: number;
    entryType: EntryType;
    amount: number;
    description?: string;
    effectiveDate: string;
}
