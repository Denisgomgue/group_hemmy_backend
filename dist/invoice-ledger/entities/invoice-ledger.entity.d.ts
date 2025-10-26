import { Invoice } from '../../invoice/entities/invoice.entity';
import { Client } from '../../client/entities/client.entity';
import { User } from '../../users/entities/user.entity';
export declare enum EntryType {
    ISSUE = "ISSUE",
    PAYMENT = "PAYMENT",
    VOID = "VOID",
    ADJUSTMENT = "ADJUSTMENT",
    RECONNECT = "RECONNECT",
    SUSPEND = "SUSPEND"
}
export declare class InvoiceLedger {
    id: number;
    entryType: EntryType;
    amount: number;
    description: string;
    effectiveDate: Date;
    created_at: Date;
    invoice: Invoice;
    client: Client;
    user: User;
}
