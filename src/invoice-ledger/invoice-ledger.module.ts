import { Module } from '@nestjs/common';
import { InvoiceLedgerService } from './invoice-ledger.service';
import { InvoiceLedgerController } from './invoice-ledger.controller';

@Module({
  controllers: [InvoiceLedgerController],
  providers: [InvoiceLedgerService],
})
export class InvoiceLedgerModule {}
