import { Actor } from '../../actor/entities/actor.entity';
export declare enum ClientStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    SUSPENDED = "SUSPENDED"
}
export declare class Client {
    id: number;
    status: ClientStatus;
    created_at: Date;
    updated_at: Date;
    actor: Actor;
}
