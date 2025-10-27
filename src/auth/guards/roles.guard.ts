import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new ForbiddenException('Usuario no autenticado');
        }

        // Obtener roles del usuario desde las relaciones cargadas
        const userRoles = user.roles?.map((userRole: any) => userRole.role?.code) || [];

        if (!userRoles.length) {
            throw new ForbiddenException('No tiene roles asignados');
        }

        const hasRole = requiredRoles.some((role) => userRoles.includes(role));

        if (!hasRole) {
            throw new ForbiddenException('No tiene permisos suficientes');
        }

        return true;
    }
}

