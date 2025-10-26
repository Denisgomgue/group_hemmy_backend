import { CreateInvoiceLedgerDto } from './dto/create-invoice-ledger.dto';
import { UpdateInvoiceLedgerDto } from './dto/update-invoice-ledger.dto';
export declare class InvoiceLedgerService {
    create(createInvoiceLedgerDto: CreateInvoiceLedgerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInvoiceLedgerDto: UpdateInvoiceLedgerDto): string;
    remove(id: number): string;
}
