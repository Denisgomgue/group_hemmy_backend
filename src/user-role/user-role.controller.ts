import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';

@Controller('user-role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede asignar roles
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) { }

  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto, @Request() req) {
    const assignedByUserId = req.user?.id;
    return this.userRoleService.create(createUserRoleDto, assignedByUserId);
  }

  @Get()
  findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userRoleService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRoleService.remove(+id);
  }
}
