import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ RolePermission, Role, Permission ]) ],
  controllers: [ RolePermissionController ],
  providers: [ RolePermissionService ],
  exports: [ RolePermissionService ],
})
export class RolePermissionModule { }
