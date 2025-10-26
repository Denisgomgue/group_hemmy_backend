import { ChargeTypeCode } from '../entities/invoice-item.entity';
export declare class CreateInvoiceItemDto {
    invoiceId: number;
    lineNumber: number;
    chargeTypeCode: ChargeTypeCode;
    description: string;
    quantity?: number;
    unitPrice: number;
    lineTotal: number;
    serviceId?: number;
    planId?: number;
}
