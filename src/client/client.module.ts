import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Plan } from 'src/plans/entities/plan.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Client, Plan, Payment ]),
    ScheduleModule.forRoot()
  ],
  controllers: [ ClientController ],
  providers: [ ClientService ],
  exports: [ ClientService, TypeOrmModule ]
})
export class ClientModule { }
