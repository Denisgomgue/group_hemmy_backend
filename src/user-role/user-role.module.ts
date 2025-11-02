import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { UserRole } from './entities/user-role.entity';
import { Role } from '../role/entities/role.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ UserRole, Role, User ]) ],
  controllers: [ UserRoleController ],
  providers: [ UserRoleService ],
  exports: [ UserRoleService ],
})
export class UserRoleModule { }
