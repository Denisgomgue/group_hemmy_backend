import { Installation } from '../../installation/entities/installation.entity';
import { Plan } from '../../plan/entities/plan.entity';
export declare enum SubscriptionStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED",
    CANCELLED = "CANCELLED"
}
export declare class Subscription {
    id: number;
    startDate: Date;
    endDate: Date;
    billingDay: number;
    status: SubscriptionStatus;
    advancePayment: boolean;
    created_at: Date;
    updated_at: Date;
    installationId: number;
    installation: Installation;
    planId: number;
    plan: Plan;
}
