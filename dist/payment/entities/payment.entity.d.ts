import { Client } from '../../client/entities/client.entity';
import { User } from '../../users/entities/user.entity';
export declare enum PaymentStatusCode {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED"
}
export declare enum PaymentMethodCode {
    CASH = "CASH",
    BANK_TRANSFER = "BANK_TRANSFER",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    PAYPAL = "PAYPAL",
    CHECK = "CHECK",
    OTHER = "OTHER"
}
export declare class Payment {
    id: number;
    statusCode: PaymentStatusCode;
    paymentDate: Date;
    scheduledDueDate: Date;
    amountTotal: number;
    methodCode: PaymentMethodCode;
    reference: string;
    extraReference: any;
    isVoid: boolean;
    voidReason: string;
    voidedAt: Date;
    created_at: Date;
    client: Client;
    createdByUser: User;
    voidedByUser: User;
}
