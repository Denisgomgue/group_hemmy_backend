import { IsEnum, IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';
import { EntryType } from '../entities/invoice-ledger.entity';

export class CreateInvoiceLedgerDto {
    @IsNumber()
    invoiceId: number;

    @IsNumber()
    clientId: number;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsEnum(EntryType)
    entryType: EntryType;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    effectiveDate: string;
}
