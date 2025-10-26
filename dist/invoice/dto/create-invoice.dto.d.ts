import { InvoiceStatusCode } from '../entities/invoice.entity';
export declare class CreateInvoiceDto {
    subscriptionId?: number;
    customerId: number;
    code?: string;
    issueDate: string;
    dueDate: string;
    baseAmount: number;
    discountAmount?: number;
    reconnectionFee?: number;
    totalAmount: number;
    statusCode: InvoiceStatusCode;
    notes?: string;
}
