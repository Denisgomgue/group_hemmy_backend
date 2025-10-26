import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceLedgerService } from './invoice-ledger.service';
import { CreateInvoiceLedgerDto } from './dto/create-invoice-ledger.dto';
import { UpdateInvoiceLedgerDto } from './dto/update-invoice-ledger.dto';

@Controller('invoice-ledger')
export class InvoiceLedgerController {
  constructor(private readonly invoiceLedgerService: InvoiceLedgerService) {}

  @Post()
  create(@Body() createInvoiceLedgerDto: CreateInvoiceLedgerDto) {
    return this.invoiceLedgerService.create(createInvoiceLedgerDto);
  }

  @Get()
  findAll() {
    return this.invoiceLedgerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceLedgerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceLedgerDto: UpdateInvoiceLedgerDto) {
    return this.invoiceLedgerService.update(+id, updateInvoiceLedgerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceLedgerService.remove(+id);
  }
}
