# 🔐 Evaluación de Seguridad del Sistema de Permisos

## 📊 Resumen Ejecutivo

**Nivel de Seguridad Actual: 65-70%**

El sistema actual tiene una base sólida pero presenta vulnerabilidades críticas que deben ser abordadas antes de un despliegue a producción. La implementación de mejoras recomendadas puede elevar la seguridad a **85-90%**.

---

## ✅ Fortalezas del Sistema Actual

### 1. **Backend - Validación de Autenticación**

- ✅ JWT con HTTP-only cookies (protección contra XSS)
- ✅ Validación de token en cada request
- ✅ Guards implementados (JwtAuthGuard, PermissionsGuard, RolesGuard)
- ✅ Sistema RBAC (Role-Based Access Control) funcional

### 2. **Frontend - UI/UX**

- ✅ Ocultación de elementos según permisos
- ✅ Componente `Can` para protección condicional
- ✅ Middleware de Next.js para protección de rutas

### 3. **Estructura de Datos**

- ✅ Separación de roles y permisos
- ✅ Permisos granulares (read, create, update, delete)
- ✅ Superadmin con permiso wildcard `*`

---

## ⚠️ Vulnerabilidades Críticas Identificadas

### 🔴 CRÍTICA 1: Falta de Validación de Permisos en Endpoints del Backend

**Problema:** La mayoría de los controladores NO usan `@UseGuards(PermissionsGuard)` ni decoradores `@Permissions()`.

**Riesgo:** Un usuario puede modificar el código del frontend, hacer llamadas API directas y acceder a recursos sin permisos.

**Ejemplo:**

```typescript
// ❌ VULNERABLE - Sin validación de permisos
@Controller('user')
export class UserController {
  @Get()
  findAll() {
    return this.userService.findAll(); // Cualquiera puede llamar esto
  }
}

// ✅ SEGURO - Con validación
@Controller('user')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
  @Get()
  @Permissions('users:read')
  findAll() {
    return this.userService.findAll();
  }
}
```

**Impacto:** ALTO - Bypass completo del sistema de permisos.

---

### 🔴 CRÍTICA 2: Validación Solo en Frontend (Client-Side Only)

**Problema:** El frontend oculta elementos según permisos, pero el backend no valida.

**Riesgo:**

- Usuario puede deshabilitar JavaScript y hacer peticiones directas
- Usuario puede modificar el código del frontend
- API puede ser llamada desde Postman/curl sin validación

**Impacto:** ALTO - Acceso no autorizado a datos sensibles.

---

### 🔴 CRÍTICA 3: Endpoints de Gestión de Permisos Sin Protección

**Problema:** Endpoints como `/permission`, `/role`, `/user-role` no están protegidos.

**Riesgo:** Un usuario autenticado podría modificar sus propios permisos o crear roles administrativos.

**Ejemplo de vulnerabilidad:**

```bash
# Un usuario normal podría hacer:
POST /permission
{
  "code": "*",
  "name": "All Permissions"
}

POST /user-role
{
  "userId": 5,
  "roleId": 1  # ID del rol SUPERADMIN
}
```

**Impacto:** CRÍTICO - Elevación de privilegios.

---

### 🟡 MEDIA 4: Permisos a Nivel de Componente No Implementados

**Problema:** No hay forma de otorgar permisos específicos a componentes dentro de una página.

**Ejemplo deseado:**

```tsx
// Usuario puede ver la página pero no el botón de eliminar
<Page>
  <Can action="read" subject="User">
    <UserList />
  </Can>
  <Can action="delete" subject="User">
    <DeleteButton /> {/* No visible si no tiene permiso */}
  </Can>
</Page>
```

**Estado Actual:** Parcialmente implementado con componente `Can`, pero falta:

- Sistema de permisos granulares por componente
- Documentación de uso
- Validación en backend para acciones específicas

**Impacto:** MEDIO - UX limitada, pero no es un problema de seguridad.

---

### 🟡 MEDIA 5: Falta de Rate Limiting

**Problema:** No hay protección contra ataques de fuerza bruta o DDoS.

**Riesgo:**

- Ataques de fuerza bruta en login
- Abuso de API endpoints
- Consumo excesivo de recursos

**Impacto:** MEDIO - Degradación de servicio, no compromiso de datos.

---

### 🟢 BAJA 6: Falta de Auditoría y Logging

**Problema:** No se registran acciones sensibles (crear/eliminar usuarios, modificar permisos).

**Riesgo:** Dificulta la detección de accesos no autorizados o actividad sospechosa.

**Impacto:** BAJO - No previene ataques, pero dificulta su detección.

---

## 📈 Plan de Mejoras de Seguridad

### 🔧 FASE 1: Correcciones Críticas (Prioridad ALTA)

#### 1. Arreglar: Proteger TODOS los endpoints del backend

**Implementación:**

1. Crear un guard global que proteja todos los endpoints por defecto:

```typescript
// src/auth/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Permitir endpoints públicos
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
```

2. Aplicar guard globalmente en `main.ts`:

```typescript
app.useGlobalGuards(new JwtAuthGuard(), new PermissionsGuard());
```

3. Proteger endpoints sensibles específicamente:

```typescript
@Controller('permission')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede gestionar permisos
export class PermissionController {
  // ...
}
```

**Tiempo estimado:** 4-6 horas  
**Seguridad mejorada:** +20%

---

#### 2. Arreglar: Validar permisos en TODOS los controladores

**Estrategia:**

- Revisar cada controlador
- Agregar decorador `@Permissions()` con el permiso requerido
- Usar permisos específicos por acción (read, create, update, delete)

**Ejemplo completo:**

```typescript
@Controller('user')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
  @Get()
  @Permissions('users:read')
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @Permissions('users:create')
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Patch(':id')
  @Permissions('users:update')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @Permissions('users:delete')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
```

**Tiempo estimado:** 8-12 horas  
**Seguridad mejorada:** +15%

---

#### 3. Arreglar: Proteger endpoints de gestión de roles/permisos

**Implementación:**

```typescript
@Controller('role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin
export class RoleController {
  // Todos los endpoints protegidos
}

@Controller('permission')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin
export class PermissionController {
  // Todos los endpoints protegidos
}

@Controller('user-role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin
export class UserRoleController {
  // Todos los endpoints protegidos
}
```

**Agregar permiso especial:**

```typescript
// En resource.seeder.ts
permissions: [
  // ... permisos existentes
  {
    code: 'roles:manage',
    name: 'Gestionar Roles y Permisos',
    description: 'Permiso para modificar roles y permisos',
  },
];
```

**Tiempo estimado:** 2-3 horas  
**Seguridad mejorada:** +10%

---

### 🛠️ FASE 2: Mejoras de Seguridad (Prioridad MEDIA)

#### 4. Implementar: Permisos a Nivel de Componente

**Frontend - Mejorar componente Can:**

```typescript
// src/components/permission/can.tsx
import { useAbility } from '@/contexts/AbilityContext';

type CanProps = {
  action: string | string[];
  subject: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  mode?: 'any' | 'all'; // 'any' = al menos uno, 'all' = todos
};

export const Can = ({
  action,
  subject,
  children,
  fallback = null,
  mode = 'any'
}: CanProps) => {
  const ability = useAbility();

  const actions = Array.isArray(action) ? action : [action];
  const subjects = Array.isArray(subject) ? subject : [subject];

  let hasAccess = false;

  if (mode === 'all') {
    // Requiere TODOS los permisos
    hasAccess = actions.every(a =>
      subjects.every(s => ability.can(a, s))
    );
  } else {
    // Requiere al menos UNO de los permisos
    hasAccess = actions.some(a =>
      subjects.some(s => ability.can(a, s))
    );
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};
```

**Uso en componentes:**

```tsx
// Ejemplo 1: Permiso simple
<Can action="delete" subject="User">
  <Button variant="destructive">Eliminar Usuario</Button>
</Can>

// Ejemplo 2: Múltiples permisos (cualquiera)
<Can action={["edit", "update"]} subject="User" mode="any">
  <Button>Editar</Button>
</Can>

// Ejemplo 3: Múltiples permisos (todos)
<Can action={["read", "export"]} subject findingsReport" mode="all">
  <ExportButton />
</Can>

// Ejemplo 4: Con fallback
<Can
  action="delete"
  subject="User"
  fallback={<Tooltip><span>No tienes permiso para eliminar</span></Tooltip>}
>
  <Button variant="destructive">Eliminar</Button>
</Can>
```

**Backend - Validación en acciones específicas:**

```typescript
// En los servicios, validar permisos antes de acciones destructivas
@Injectable()
export class UserService {
  constructor(private permissionGuard: PermissionsGuard) {}

  async delete(id: number, currentUser: User) {
    // Verificar que el usuario tiene permiso para eliminar
    const hasPermission = await this.checkPermission(
      currentUser,
      'users:delete',
    );

    if (!hasPermission) {
      throw new ForbiddenException('No tiene permiso para eliminar usuarios');
    }

    return this.userRepository.remove(id);
  }
}
```

**Tiempo estimado:** 4-6 horas  
**Seguridad mejorada:** +5%

---

#### 5. Implementar: Rate Limiting

**Instalar dependencia:**

```bash
npm install @nestjs/throttler
```

**Configuración:**

```typescript
// app.module.ts
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // 60 segundos
      limit: 10, // 10 requests por minuto
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
```

**Rate limiting específico por endpoint:**

```typescript
@Controller('auth')
export class AuthController {
  @Throttle(5, 60) // 5 intentos por minuto
  @Post('login')
  login() {
    // ...
  }
}
```

**Tiempo estimado:** 2-3 horas  
**Seguridad mejorada:** +5%

---

#### 6. Implementar: Auditoría y Logging

**Crear entidad de auditoría:**

```typescript
@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  action: string; // 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', etc.

  @Column()
  resource: string; // 'User', 'Role', 'Permission', etc.

  @Column({ type: 'json', nullable: true })
  metadata: any;

  @CreateDateColumn()
  createdAt: Date;
}
```

**Crear servicio de auditoría:**

```typescript
@Injectable()
export class AuditService {
  async log(userId: number, action: string, resource: string, metadata?: any) {
    // Guardar en base de datos
    // Opcionalmente enviar a servicio externo (Sentry, etc.)
  }
}
```

**Uso en servicios:**

```typescript
async delete(id: number, currentUser: User) {
  const user = await this.userRepository.findOne({ where: { id } });

  await this.userRepository.remove(user);

  // Registrar en auditoría
  await this.auditService.log(
    currentUser.id,
    'DELETE',
    'User',
    { deletedUserId: id, deletedUserEmail: user.email }
  );
}
```

**Tiempo estimado:** 6-8 horas  
**Seguridad mejorada:** +3%

---

### 🚀 FASE 3: Mejoras Avanzadas (Prioridad BAJA)

#### 7. Implementar: Validación de Permisos por Recurso

**Permisos granulares por ID de recurso:**

```typescript
// Usuario solo puede editar sus propios datos, admin puede editar todos
@Patch(':id')
@Permissions('users:update')
async update(
  @Param('id') id: number,
  @Body() dto: UpdateUserDto,
  @CurrentUser() user: User
) {
  // Si no es admin, solo puede editar su propio perfil
  if (id !== user.id && !this.hasPermission(user, 'users:update:all')) {
    throw new ForbiddenException('Solo puedes editar tu propio perfil');
  }

  return this.userService.update(id, dto);
}
```

#### 8. Implementar: Validación de Permisos Dinámicos

**Permisos basados en contexto:**

```typescript
// Usuario puede ver solo sus propias instalaciones
@Get('installations')
@Permissions('installations:read')
async getInstallations(@CurrentUser() user: User) {
  if (this.hasPermission(user, 'installations:read:all')) {
    return this.installationService.findAll();
  } else {
    return this.installationService.findByUserId(user.id);
  }
}
```

---

## 📋 Checklist de Implementación

### 🔴 Crítico (Antes de producción)

- [ ] Proteger TODOS los endpoints con guards
- [ ] Agregar decoradores `@Permissions()` a todos los métodos
- [ ] Proteger endpoints de gestión de roles/permisos
- [ ] Agregar permiso `roles:manage` para superadmin
- [ ] Tests de seguridad (verificar que endpoints rechazan sin permisos)

### 🟡 Importante (Primera semana)

- [ ] Implementar permisos a nivel de componente mejorados
- [ ] Rate limiting en endpoints críticos
- [ ] Logging básico de acciones sensibles

### 🟢 Deseable (Primer mes)

- [ ] Auditoría completa
- [ ] Dashboard de auditoría
- [ ] Alertas automáticas por actividad sospechosa
- [ ] Permisos por recurso individual

---

## 🎯 Porcentajes de Seguridad Estimados

| Estado                | Seguridad | Riesgo                                   |
| --------------------- | --------- | ---------------------------------------- |
| **Actual**            | 65-70%    | ALTO - No apto para producción           |
| **Después de Fase 1** | 80-85%    | MEDIO - Aceptable para producción básica |
| **Después de Fase 2** | 85-90%    | BAJO - Bueno para producción             |
| **Después de Fase 3** | 90-95%    | MUY BAJO - Excelente para producción     |

---

## 📚 Recursos Adicionales

### Documentación Recomendada

- [NestJS Guards](https://docs.nestjs.com/guards)
- [CASL Authorization](https://casl.js.org/v6/en)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE-284: Improper Access Control](https://cwe.mitre.org/data/definitions/284.html)

### Herramientas de Testing

- [OWASP ZAP](https://www.zaproxy.org/) - Scanner de vulnerabilidades
- [Postman](https://www.postman.com/) - Testing de API
- [Burp Suite](https://portswigger.net/burp) - Análisis de seguridad avanzado

---

## 🔍 Conclusión

El sistema actual tiene una **base sólida** pero **vulnerabilidades críticas** que deben ser corregidas antes del despliegue a producción. La implementación de las mejoras propuestas puede elevar la seguridad de **65% a 85-90%**, lo cual es adecuado para la mayoría de aplicaciones empresariales.

**Recomendación:** Implementar FASE 1 completa antes de cualquier despliegue a producción. Las fases 2 y 3 pueden implementarse de forma incremental según las necesidades del negocio.

---

**Documento generado:** {{ fecha }}  
**Última actualización:** {{ fecha }}
