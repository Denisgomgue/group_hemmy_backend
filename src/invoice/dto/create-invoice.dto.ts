import { IsEnum, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';
import { InvoiceStatusCode } from '../entities/invoice.entity';

export class CreateInvoiceDto {
    @IsOptional()
    @IsNumber()
    subscriptionId?: number;

    @IsNumber()
    customerId: number;

    @IsOptional()
    @IsString()
    code?: string;

    @IsDateString()
    issueDate: string;

    @IsDateString()
    dueDate: string;

    @IsNumber()
    baseAmount: number;

    @IsOptional()
    @IsNumber()
    discountAmount?: number;

    @IsOptional()
    @IsNumber()
    reconnectionFee?: number;

    @IsNumber()
    totalAmount: number;

    @IsEnum(InvoiceStatusCode)
    statusCode: InvoiceStatusCode;

    @IsOptional()
    @IsString()
    notes?: string;
}
