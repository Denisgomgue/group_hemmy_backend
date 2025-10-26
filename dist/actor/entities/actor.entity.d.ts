import { Person } from '../../person/entities/person.entity';
import { Organization } from '../../organization/entities/organization.entity';
export declare enum ActorKind {
    PERSON = "PERSON",
    ORGANIZATION = "ORGANIZATION"
}
export declare class Actor {
    id: number;
    kind: ActorKind;
    displayName: string;
    created_at: Date;
    person: Person;
    organization: Organization;
}
