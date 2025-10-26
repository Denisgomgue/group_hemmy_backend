import { Actor } from '../../actor/entities/actor.entity';
export declare class User {
    id: number;
    passwordHash: string;
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
    actor: Actor;
}
