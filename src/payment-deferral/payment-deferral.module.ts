import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentDeferralService } from './payment-deferral.service';
import { PaymentDeferralController } from './payment-deferral.controller';
import { PaymentDeferral } from './entities/payment-deferral.entity';

@Module({
    imports: [ TypeOrmModule.forFeature([ PaymentDeferral ]) ],
    controllers: [ PaymentDeferralController ],
    providers: [ PaymentDeferralService ],
})
export class PaymentDeferralModule { }


