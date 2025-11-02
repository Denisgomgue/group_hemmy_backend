import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request) => {
                    return request?.cookies?.access_token;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') || 'tu_secret_key_muy_segura_aqui',
        });
    }

    async validate(payload: any) {
        const user = await this.userRepository.findOne({
            where: { id: payload.sub },
            relations: [
                'actor',
                'actor.person',
                'actor.organization',
            ],
        });

        if (!user || !user.isActive) {
            throw new UnauthorizedException('Usuario inactivo o no encontrado');
        }

        // Cargar roles y permisos del usuario
        const userRolesData = await this.userRepository.manager
            .createQueryBuilder()
            .select([
                'userRole.id',
                'userRole.assignedAt',
                'role.id',
                'role.code',
                'role.name',
                'role.isSystem',
                'permission.id',
                'permission.code',
                'permission.name',
            ])
            .from('user_role', 'userRole')
            .leftJoin('role', 'role', 'role.id = userRole.roleId')
            .leftJoin('role_permission', 'rolePermission', 'rolePermission.roleId = role.id')
            .leftJoin('permission', 'permission', 'permission.id = rolePermission.permissionId')
            .where('userRole.UserId = :userId', { userId: user.id })
            .getRawMany();

        // Organizar roles y permisos
        const rolesMap = new Map();
        userRolesData.forEach((row: any) => {
            const roleId = row.role_id;
            if (roleId && !rolesMap.has(roleId)) {
                rolesMap.set(roleId, {
                    id: row.userRole_id,
                    role: {
                        id: row.role_id,
                        code: row.role_code,
                        name: row.role_name,
                        isSystem: row.role_isSystem,
                        permissions: [],
                    },
                    assignedAt: row.userRole_assignedAt,
                });
            }
            if (row.permission_id) {
                const role = rolesMap.get(roleId);
                if (role) {
                    // Verificar si el permiso ya existe
                    const existingPerm = role.role.permissions.find(
                        (p: any) => (p.permission?.id || p.id) === row.permission_id
                    );
                    if (!existingPerm) {
                        role.role.permissions.push({
                            permission: {
                                id: row.permission_id,
                                code: row.permission_code,
                                name: row.permission_name,
                            },
                            // También incluir code directamente para compatibilidad
                            code: row.permission_code,
                            id: row.permission_id,
                        });
                    }
                }
            }
        });

        (user as any).roles = Array.from(rolesMap.values());

        return user;
    }
}

