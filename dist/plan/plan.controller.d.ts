import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
export declare class PlanController {
    private readonly planService;
    constructor(planService: PlanService);
    create(createPlanDto: CreatePlanDto): Promise<import("./entities/plan.entity").Plan>;
    findAll(): Promise<import("./entities/plan.entity").Plan[]>;
    findOne(id: string): Promise<import("./entities/plan.entity").Plan>;
    update(id: string, updatePlanDto: UpdatePlanDto): Promise<import("./entities/plan.entity").Plan>;
    remove(id: string): Promise<void>;
}
