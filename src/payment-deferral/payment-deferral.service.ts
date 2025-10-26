import { Injectable } from '@nestjs/common';
import { CreatePaymentDeferralDto } from './dto/create-payment-deferral.dto';
import { UpdatePaymentDeferralDto } from './dto/update-payment-deferral.dto';

@Injectable()
export class PaymentDeferralService {
    create(createPaymentDeferralDto: CreatePaymentDeferralDto) {
        return 'This action adds a new payment deferral';
    }

    findAll() {
        return `This action returns all payment deferrals`;
    }

    findOne(id: number) {
        return `This action returns a #${id} payment deferral`;
    }

    update(id: number, updatePaymentDeferralDto: UpdatePaymentDeferralDto) {
        return `This action updates a #${id} payment deferral`;
    }

    remove(id: number) {
        return `This action removes a #${id} payment deferral`;
    }
}


