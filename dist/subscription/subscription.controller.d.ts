import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<CreateSubscriptionDto & import("./entities/subscription.entity").Subscription>;
    findAll(): Promise<import("./entities/subscription.entity").Subscription[]>;
    findOne(id: string): Promise<import("./entities/subscription.entity").Subscription | null>;
    update(id: string, updateSubscriptionDto: UpdateSubscriptionDto): Promise<import("./entities/subscription.entity").Subscription | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
