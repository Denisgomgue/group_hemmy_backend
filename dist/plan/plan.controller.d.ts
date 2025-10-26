import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    create(createPlanDto: CreatePlanDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePlanDto: UpdatePlanDto): string;
    remove(id: string): string;
}
