import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
            PERMISSIONS_KEY,
            [ context.getHandler(), context.getClass() ],
        );

        if (!requiredPermissions) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('Usuario no autenticado');
        }

        // Obtener permisos del usuario (desde roles y permisos directos)
        const userPermissions = this.extractPermissions(user);

        const hasPermission = requiredPermissions.some((permission) =>
            userPermissions.includes(permission),
        );

        if (!hasPermission) {
            throw new ForbiddenException('No tiene permisos suficientes');
        }

        return true;
    }

    private extractPermissions(user: any): string[] {
        const permissions: string[] = [];

        // Permisos desde roles
        if (user.roles) {
            user.roles.forEach((userRole: any) => {
                if (userRole.role?.permissions) {
                    userRole.role.permissions.forEach((rolePermission: any) => {
                        const permCode = rolePermission.permission?.code;
                        if (permCode) {
                            permissions.push(permCode);
                        }
                    });
                }
            });
        }

        // Permisos directos del usuario
        if (user.permissions) {
            user.permissions.forEach((userPermission: any) => {
                const permCode = userPermission.permission?.code;
                if (permCode) {
                    permissions.push(permCode);
                }
            });
        }

        return [ ...new Set(permissions) ];
    }
}

