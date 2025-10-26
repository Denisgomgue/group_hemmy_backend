import { PaymentStatusCode, PaymentMethodCode } from '../entities/payment.entity';
export declare class CreatePaymentDto {
    clientId: number;
    statusCode: PaymentStatusCode;
    paymentDate?: string;
    scheduledDueDate?: string;
    amountTotal: number;
    methodCode?: PaymentMethodCode;
    reference?: string;
    extraReference?: any;
    createdByUserId?: number;
    isVoid?: boolean;
    voidReason?: string;
    voidedAt?: string;
    voidedByUserId?: number;
}
