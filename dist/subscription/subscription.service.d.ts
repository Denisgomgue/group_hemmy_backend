import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
export declare class SubscriptionService {
    private subscriptionRepository;
    constructor(subscriptionRepository: Repository<Subscription>);
    create(createSubscriptionDto: CreateSubscriptionDto): Promise<CreateSubscriptionDto & Subscription>;
    findAll(): Promise<Subscription[]>;
    findOne(id: number): Promise<Subscription | null>;
    update(id: number, updateSubscriptionDto: UpdateSubscriptionDto): Promise<Subscription | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
