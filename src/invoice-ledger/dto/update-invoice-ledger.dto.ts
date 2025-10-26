import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceLedgerDto } from './create-invoice-ledger.dto';

export class UpdateInvoiceLedgerDto extends PartialType(CreateInvoiceLedgerDto) {}
