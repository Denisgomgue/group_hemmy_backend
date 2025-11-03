import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('role-permission')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede gestionar permisos de roles
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) { }

  @Post()
  create(@Body() createRolePermissionDto: CreateRolePermissionDto) {
    return this.rolePermissionService.create(createRolePermissionDto);
  }

  @Get()
  findAll(@Query('roleId') roleId?: string, @Query('permissionId') permissionId?: string) {
    const roleIdNum = roleId ? parseInt(roleId, 10) : undefined;
    const permissionIdNum = permissionId ? parseInt(permissionId, 10) : undefined;
    return this.rolePermissionService.findAll(roleIdNum, permissionIdNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolePermissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolePermissionDto: UpdateRolePermissionDto) {
    return this.rolePermissionService.update(+id, updateRolePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolePermissionService.remove(+id);
  }
}
