import { IsEnum, IsOptional, IsNumber, IsDateString, IsBoolean } from 'class-validator';
import { SubscriptionStatus } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
    @IsDateString()
    startDate: string;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsNumber()
    billingDay: number;

    @IsEnum(SubscriptionStatus)
    status: SubscriptionStatus;

    @IsOptional()
    @IsBoolean()
    advancePayment?: boolean;

    @IsNumber()
    installationId: number;

    @IsNumber()
    planId: number;
}
