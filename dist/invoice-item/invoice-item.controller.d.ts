import { InvoiceItemService } from './invoice-item.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
export declare class InvoiceItemController {
    private readonly invoiceItemService;
    constructor(invoiceItemService: InvoiceItemService);
    create(createInvoiceItemDto: CreateInvoiceItemDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInvoiceItemDto: UpdateInvoiceItemDto): string;
    remove(id: string): string;
}
