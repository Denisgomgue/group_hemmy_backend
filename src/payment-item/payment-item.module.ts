import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentItemService } from './payment-item.service';
import { PaymentItemController } from './payment-item.controller';
import { PaymentItem } from './entities/payment-item.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ PaymentItem ]) ],
    controllers: [ PaymentItemController ],
    providers: [ PaymentItemService ],
})
export class PaymentItemModule { }

