import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
export declare class InvoiceItemService {
    create(createInvoiceItemDto: CreateInvoiceItemDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInvoiceItemDto: UpdateInvoiceItemDto): string;
    remove(id: number): string;
}
