import { InvoiceLedgerService } from './invoice-ledger.service';
import { CreateInvoiceLedgerDto } from './dto/create-invoice-ledger.dto';
import { UpdateInvoiceLedgerDto } from './dto/update-invoice-ledger.dto';
export declare class InvoiceLedgerController {
    private readonly invoiceLedgerService;
    constructor(invoiceLedgerService: InvoiceLedgerService);
    create(createInvoiceLedgerDto: CreateInvoiceLedgerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInvoiceLedgerDto: UpdateInvoiceLedgerDto): string;
    remove(id: string): string;
}
