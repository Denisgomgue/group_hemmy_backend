import { SubscriptionStatus } from '../entities/subscription.entity';
export declare class CreateSubscriptionDto {
    startDate: string;
    endDate?: string;
    billingDay: number;
    status: SubscriptionStatus;
    advancePayment?: boolean;
    installationId: number;
    planId: number;
}
