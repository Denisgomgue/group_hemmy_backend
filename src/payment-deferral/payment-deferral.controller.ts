import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentDeferralService } from './payment-deferral.service';
import { CreatePaymentDeferralDto } from './dto/create-payment-deferral.dto';
import { UpdatePaymentDeferralDto } from './dto/update-payment-deferral.dto';

@Controller('payment-deferral')
export class PaymentDeferralController {
    constructor(private readonly paymentDeferralService: PaymentDeferralService) { }

    @Post()
    create(@Body() createPaymentDeferralDto: CreatePaymentDeferralDto) {
        return this.paymentDeferralService.create(createPaymentDeferralDto);
    }

    @Get()
    findAll() {
        return this.paymentDeferralService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.paymentDeferralService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePaymentDeferralDto: UpdatePaymentDeferralDto) {
        return this.paymentDeferralService.update(+id, updatePaymentDeferralDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.paymentDeferralService.remove(+id);
    }
}


