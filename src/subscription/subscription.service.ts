import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) { }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionRepository.save(createSubscriptionDto);
  }

  async findAll() {
    return await this.subscriptionRepository.find({
      relations: [
        'installation',
        'installation.client',
        'installation.client.actor',
        'installation.client.actor.person',
        'installation.client.actor.organization',
        'installation.sector',
        'plan',
        'plan.service'
      ],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    return await this.subscriptionRepository.findOne({
      where: { id },
      relations: [
        'installation',
        'installation.client',
        'installation.client.actor',
        'installation.client.actor.person',
        'installation.client.actor.organization',
        'installation.sector',
        'plan',
        'plan.service'
      ],
    });
  }

  async update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    await this.subscriptionRepository.update(id, updateSubscriptionDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return await this.subscriptionRepository.delete(id);
  }
}
