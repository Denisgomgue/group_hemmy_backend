import { Injectable } from '@nestjs/common';
import { CreateInvoiceLedgerDto } from './dto/create-invoice-ledger.dto';
import { UpdateInvoiceLedgerDto } from './dto/update-invoice-ledger.dto';

@Injectable()
export class InvoiceLedgerService {
  create(createInvoiceLedgerDto: CreateInvoiceLedgerDto) {
    return 'This action adds a new invoiceLedger';
  }

  findAll() {
    return `This action returns all invoiceLedger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} invoiceLedger`;
  }

  update(id: number, updateInvoiceLedgerDto: UpdateInvoiceLedgerDto) {
    return `This action updates a #${id} invoiceLedger`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoiceLedger`;
  }
}
