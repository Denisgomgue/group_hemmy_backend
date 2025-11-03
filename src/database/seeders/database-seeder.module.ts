import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeedersService } from './database-seeders.service';
import { InventorySeederService } from './inventory-seeder.service';
import { UserSeederService } from './user-seeder.service';
import { EquipmentCategoriesModule } from '../../equipment-categories/equipment-categories.module';
import { Person } from '../../person/entities/person.entity';
import { Actor } from '../../actor/entities/actor.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { Permission } from '../../permission/entities/permission.entity';
import { RolePermission } from '../../role-permission/entities/role-permission.entity';
import { UserRole } from '../../user-role/entities/user-role.entity';
import { Resource } from '../../resource/entities/resource.entity';

@Module({
    imports: [
        EquipmentCategoriesModule,
        TypeOrmModule.forFeature([
            Person,
            Actor,
            User,
            Role,
            Permission,
            RolePermission,
            UserRole,
            Resource
        ]),
    ],
    providers: [
        DatabaseSeedersService,
        InventorySeederService,
        UserSeederService,
    ],
    exports: [
        DatabaseSeedersService,
        InventorySeederService,
        UserSeederService,
    ],
})
export class DatabaseSeederModule { }

