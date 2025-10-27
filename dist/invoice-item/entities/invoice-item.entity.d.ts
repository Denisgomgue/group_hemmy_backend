import { Service } from '../../service/entities/service.entity';
import { Plan } from '../../plan/entities/plan.entity';
import { Invoice } from '../../invoice/entities/invoice.entity';
export declare enum ChargeTypeCode {
    SUBSCRIPTION = "SUBSCRIPTION",
    ADDON = "ADDON",
    RECONNECTION = "RECONNECTION",
    DISCOUNT = "DISCOUNT",
    OTHER = "OTHER"
}
export declare class InvoiceItem {
    id: number;
    lineNumber: number;
    chargeTypeCode: ChargeTypeCode;
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    created_at: Date;
    invoice: Invoice;
    service: Service;
    plan: Plan;
}
