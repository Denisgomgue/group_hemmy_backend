import { IsNumber, IsDateString, IsEnum, IsString, IsOptional } from 'class-validator';
import { PaymentDeferralStatus } from '../entities/payment-deferral.entity';

export class CreatePaymentDeferralDto {
    @IsNumber()
    clientId: number;

    @IsOptional()
    @IsNumber()
    invoiceId?: number;

    @IsNumber()
    amount: number;

    @IsDateString()
    scheduledPaymentDate: string;

    @IsOptional()
    @IsEnum(PaymentDeferralStatus)
    status?: PaymentDeferralStatus;

    @IsDateString()
    requestedOn: string;

    @IsOptional()
    @IsString()
    reason?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsNumber()
    createdByUserId?: number;
}


