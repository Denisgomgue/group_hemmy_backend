import { ActorKind } from '../entities/actor.entity';
export declare class CreateActorDto {
    kind: ActorKind;
    displayName: string;
    personId?: number;
    organizationId?: number;
}
