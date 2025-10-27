import { Client } from '../../client/entities/client.entity';
import { User } from '../../users/entities/user.entity';
export declare enum PaymentStatusCode {
    PENDING = "PENDING",
    PAID = "PAID",
    OVERDUE = "OVERDUE",
    REFUNDED = "REFUNDED"
}
export declare enum PaymentMethodCode {
    CASH = "CASH",
    TRANSFER = "TRANSFER",
    YAPE = "YAPE",
    PLIN = "PLIN",
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
    isVoid: boolean;
    voidReason: string;
    voidedAt: Date;
    created_at: Date;
    updated_at: Date;
    client: Client;
    createdByUser: User;
    voidedByUser: User;
}
