import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
export declare class PlanService {
    private planRepository;
    constructor(planRepository: Repository<Plan>);
    create(createPlanDto: CreatePlanDto): Promise<Plan>;
    findAll(): Promise<Plan[]>;
    findOne(id: number): Promise<Plan>;
    update(id: number, updatePlanDto: UpdatePlanDto): Promise<Plan>;
    remove(id: number): Promise<void>;
}
