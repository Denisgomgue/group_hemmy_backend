import { IsEnum, IsOptional, IsNumber, IsString, IsDecimal } from 'class-validator';
import { ChargeTypeCode } from '../entities/invoice-item.entity';

export class CreateInvoiceItemDto {
    @IsNumber()
    invoiceId: number;

    @IsNumber()
    lineNumber: number;

    @IsEnum(ChargeTypeCode)
    chargeTypeCode: ChargeTypeCode;

    @IsString()
    description: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsNumber()
    unitPrice: number;

    @IsNumber()
    lineTotal: number;

    @IsOptional()
    @IsNumber()
    serviceId?: number;

    @IsOptional()
    @IsNumber()
    planId?: number;
}
