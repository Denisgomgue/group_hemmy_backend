import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { Plan } from './entities/plan.entity';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Plan ]),
    ServiceModule,
  ],
  controllers: [ PlanController ],
  providers: [ PlanService ],
  exports: [ PlanService ],
})
export class PlanModule { }
