import { IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';
import { ActorKind } from '../entities/actor.entity';

export class CreateActorDto {
    @IsEnum(ActorKind)
    kind: ActorKind;

    @IsString()
    displayName: string;

    @IsOptional()
    @IsNumber()
    personId?: number;

    @IsOptional()
    @IsNumber()
    organizationId?: number;
}
