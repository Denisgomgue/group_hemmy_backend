import { Subscription } from '../../subscription/entities/subscription.entity';
import { Client } from '../../client/entities/client.entity';
export declare enum InvoiceStatusCode {
    PENDING = "PENDING",
    LATE = "LATE",
    PAID = "PAID",
    VOIDED = "VOIDED",
    PARTIAL = "PARTIAL"
}
export declare class Invoice {
    id: number;
    code: string;
    issueDate: Date;
    dueDate: Date;
    baseAmount: number;
    discountAmount: number;
    reconnectionFee: number;
    totalAmount: number;
    statusCode: InvoiceStatusCode;
    notes: string;
    created_at: Date;
    updated_at: Date;
    subscription: Subscription;
    customer: Client;
}
