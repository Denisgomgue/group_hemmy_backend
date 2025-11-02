# 🚨 Vulnerabilidad Crítica Resuelta: Creación de Superadmin

## ⚠️ Problema Identificado

**SEVERIDAD: CRÍTICA**

Un usuario normal autenticado podía crear o asignarse el rol de SUPERADMIN sin restricciones.

### Cómo funcionaba el ataque:

1. **Asignarse el rol SUPERADMIN:**

   ```bash
   POST /user-role
   {
     "userId": 5,  # Su propio ID
     "roleId": 1   # ID del rol SUPERADMIN
   }
   ```

2. **Crear un nuevo usuario superadmin:**

   ```bash
   POST /users
   {
     "email": "hacker@example.com",
     "password": "hacker123"
   }

   POST /user-role
   {
     "userId": 10,  # ID del nuevo usuario
     "roleId": 1    # Rol SUPERADMIN
   }
   ```

3. **Modificar roles existentes:**
   ```bash
   PATCH /role/1
   {
     "code": "SUPERADMIN",
     "permissions": ["*"]
   }
   ```

### Por qué era posible:

- ❌ Los controladores `RoleController`, `PermissionController` y `UserRoleController` **NO tenían guards**
- ❌ **NO había validación de permisos** en estos endpoints
- ❌ **Cualquier usuario autenticado** podía acceder a estos endpoints

---

## ✅ Solución Implementada

### 1. Agregado permiso especial `roles:manage`

**Archivo:** `src/database/seeders/resource.seeder.ts`

```typescript
permissions: [
  // ... otros permisos
  {
    code: 'roles:manage',
    name: 'Gestionar Roles y Permisos',
    description:
      'Permiso para crear, modificar y eliminar roles y permisos. Solo para superadministradores.',
  },
];
```

Este permiso solo está asignado al rol **SUPERADMIN**:

```typescript
rolePermissions: [
  { roleCode: 'SUPERADMIN', permissions: ['*', 'roles:manage'] },
  // Otros roles NO tienen este permiso
];
```

### 2. Protegidos los controladores críticos

**Archivos modificados:**

- ✅ `src/role/role.controller.ts`
- ✅ `src/permission/permission.controller.ts`
- ✅ `src/user-role/user-role.controller.ts`

**Protección implementada:**

```typescript
@Controller('role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede gestionar roles
export class RoleController {
  // ...
}
```

### 3. Resultado

Ahora:

- ✅ Solo usuarios con permiso `roles:manage` pueden acceder a estos endpoints
- ✅ Solo el **SUPERADMIN** tiene el permiso `roles:manage`
- ✅ Un usuario normal recibirá error `403 Forbidden` si intenta acceder
- ✅ Un administrador normal **NO puede** crear o asignar rol SUPERADMIN

---

## 🔄 Pasos para Aplicar la Solución

### 1. Ejecutar el seeder para agregar el nuevo permiso

```bash
cd grupo_hemmy_backend
npm run seed:run
```

O si tienes un comando específico:

```bash
npm run seed:users
```

**Nota:** El permiso `roles:manage` se agregará automáticamente y se asignará solo al rol SUPERADMIN.

### 2. Reiniciar el servidor backend

```bash
npm run start:dev
```

### 3. Verificar la protección

Intenta hacer una petición sin ser superadmin:

```bash
# Debería fallar con 403 Forbidden
POST http://localhost:3000/user-role
Authorization: Bearer <token_de_usuario_normal>
{
  "userId": 5,
  "roleId": 1
}
```

**Respuesta esperada:**

```json
{
  "statusCode": 403,
  "message": "No tiene permisos suficientes"
}
```

---

## 🧪 Testing de Seguridad

### Test 1: Usuario normal intenta asignar rol SUPERADMIN

```bash
# 1. Login como usuario normal (ej: tecnico@hemmy.com)
POST /auth/login
{
  "email": "tecnico@hemmy.com",
  "password": "tecnico123"
}

# 2. Intentar asignar rol SUPERADMIN
POST /user-role
Headers: Cookie: access_token=<token>
{
  "userId": 2,
  "roleId": 1  # ID del rol SUPERADMIN
}

# Resultado esperado: 403 Forbidden ✅
```

### Test 2: Superadmin puede gestionar roles

```bash
# 1. Login como superadmin
POST /auth/login
{
  "email": "superadmin@hemmy.com",
  "password": "superadmin123"
}

# 2. Asignar rol (debería funcionar)
POST /user-role
Headers: Cookie: access_token=<token>
{
  "userId": 2,
  "roleId": 3  # ID de otro rol
}

# Resultado esperado: 200 OK ✅
```

---

## 📋 Checklist de Verificación

- [x] Permiso `roles:manage` agregado al seeder
- [x] Permiso asignado solo a SUPERADMIN
- [x] `RoleController` protegido con `@Permissions('roles:manage')`
- [x] `PermissionController` protegido con `@Permissions('roles:manage')`
- [x] `UserRoleController` protegido con `@Permissions('roles:manage')`
- [ ] Seeder ejecutado (ejecutar manualmente)
- [ ] Tests de seguridad realizados
- [ ] Documentación actualizada

---

## 🔒 Protecciones Adicionales Recomendadas

### 1. Validación adicional en servicios

Agregar validación en los servicios para prevenir asignación de rol SUPERADMIN:

```typescript
// En user-role.service.ts
async create(createUserRoleDto: CreateUserRoleDto, currentUser: User) {
  // Verificar que el rol no sea SUPERADMIN
  const role = await this.roleRepository.findOne({
    where: { id: createUserRoleDto.roleId }
  });

  if (role?.code === 'SUPERADMIN') {
    // Verificar que el usuario actual es superadmin
    const isCurrentUserSuperAdmin = await this.checkSuperAdmin(currentUser);
    if (!isCurrentUserSuperAdmin) {
      throw new ForbiddenException('Solo superadmin puede asignar rol SUPERADMIN');
    }
  }

  // ... resto de la lógica
}
```

### 2. Validar que no se puede eliminar el último superadmin

```typescript
// Prevenir eliminar el último superadmin
async removeUserRole(userRoleId: number) {
  const userRole = await this.findOne(userRoleId);

  if (userRole.role.code === 'SUPERADMIN') {
    // Contar cuántos superadmins quedan
    const superAdminCount = await this.countSuperAdmins();
    if (superAdminCount <= 1) {
      throw new ForbiddenException('No se puede eliminar el último superadmin');
    }
  }

  // ... eliminar
}
```

### 3. Auditoría

Registrar todas las acciones relacionadas con roles y permisos:

```typescript
// En cada operación de roles
await this.auditService.log(currentUser.id, 'ROLE_ASSIGNED', 'UserRole', {
  userId: createUserRoleDto.userId,
  roleId: createUserRoleDto.roleId,
});
```

---

## 📚 Referencias

- Ver `EVALUACION_SEGURIDAD_PERMISOS.md` para más detalles sobre seguridad
- Ver `ROL_Y_PERMISOS_EXPLICACION.md` para entender el sistema de permisos

---

**Fecha de resolución:** {{ fecha }}  
**Severidad:** CRÍTICA  
**Estado:** ✅ RESUELTO
