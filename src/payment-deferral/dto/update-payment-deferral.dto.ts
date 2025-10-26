import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDeferralDto } from './create-payment-deferral.dto';

export class UpdatePaymentDeferralDto extends PartialType(CreatePaymentDeferralDto) { }


