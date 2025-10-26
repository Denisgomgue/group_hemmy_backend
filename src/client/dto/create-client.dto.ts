import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';
import { ClientStatus } from '../entities/client.entity';

export class CreateClientDto {
    @IsEnum(ClientStatus)
    status: ClientStatus;

    @IsNumber()
    actorId: number;
}
