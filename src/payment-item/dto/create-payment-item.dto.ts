import { IsNumber } from 'class-validator';

export class CreatePaymentItemDto {
    @IsNumber()
    paymentId: number;

    @IsNumber()
    invoiceId: number;

    @IsNumber()
    amount: number;

    @IsNumber()
    discount?: number;
}

