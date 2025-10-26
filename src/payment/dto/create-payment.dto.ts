import { IsEnum, IsOptional, IsNumber, IsDateString, IsString, IsBoolean, IsObject } from 'class-validator';
import { PaymentStatusCode, PaymentMethodCode } from '../entities/payment.entity';

export class CreatePaymentDto {
    @IsNumber()
    clientId: number;

    @IsEnum(PaymentStatusCode)
    statusCode: PaymentStatusCode;

    @IsOptional()
    @IsDateString()
    paymentDate?: string;

    @IsOptional()
    @IsDateString()
    scheduledDueDate?: string;

    @IsNumber()
    amountTotal: number;

    @IsOptional()
    @IsEnum(PaymentMethodCode)
    methodCode?: PaymentMethodCode;

    @IsOptional()
    @IsString()
    reference?: string;

    @IsOptional()
    @IsNumber()
    createdByUserId?: number;

    @IsOptional()
    @IsBoolean()
    isVoid?: boolean;

    @IsOptional()
    @IsString()
    voidReason?: string;

    @IsOptional()
    @IsDateString()
    voidedAt?: string;

    @IsOptional()
    @IsNumber()
    voidedByUserId?: number;
}
