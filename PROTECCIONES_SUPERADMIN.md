# 🔒 Protecciones Críticas: SUPERADMIN Inmutable

## 📋 Resumen

Este documento detalla todas las protecciones implementadas para garantizar que el rol **SUPERADMIN** sea único, inmutable y no pueda ser modificado por usuarios normales, incluso mediante intentos de inyección SQL o manipulación de datos.

---

## 🎯 Principio Fundamental

**Solo el rol SUPERADMIN tiene `isSystem: true`** y está completamente protegido. Los demás roles (ADMINISTRADOR, TECNICO, SECRETARIA) tienen `isSystem: false` y pueden ser editados o eliminados si es necesario.

---

## 🛡️ Protecciones Implementadas

### 1. **Protección a Nivel de Seeder**

**Archivo:** `src/database/seeders/resource.seeder.ts`

```typescript
roles: [
  {
    code: 'SUPERADMIN',
    name: 'Super Administrador',
    isSystem: true, // ✅ ÚNICO con isSystem: true
  },
  {
    code: 'ADMINISTRADOR',
    isSystem: false, // ✅ Puede ser editado/eliminado
  },
  // ... otros roles también false
];
```

---

### 2. **Protección en RoleService**

**Archivo:** `src/role/role.service.ts`

#### ✅ No se puede modificar el rol SUPERADMIN:

```typescript
async update(id: number, updateRoleDto: UpdateRoleDto) {
  const role = await this.roleRepository.findOne({ where: { id } });

  // 🔒 BLOQUEO TOTAL: Cualquier intento de modificación es rechazado
  if (role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'El rol SUPERADMIN es inmutable. No se puede modificar de ninguna manera.'
    );
  }
  // ... resto de validaciones
}
```

#### ✅ No se puede eliminar el rol SUPERADMIN:

```typescript
async remove(id: number) {
  const role = await this.roleRepository.findOne({ where: { id } });

  // 🔒 BLOQUEO TOTAL: No se puede eliminar
  if (role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'El rol SUPERADMIN es inmutable y no puede ser eliminado.'
    );
  }
  // ... resto de validaciones
}
```

#### ✅ No se pueden crear roles con `isSystem: true`:

```typescript
async create(createRoleDto: CreateRoleDto) {
  // 🔒 Solo seeders pueden crear roles del sistema
  if (createRoleDto.isSystem === true) {
    throw new ForbiddenException(
      'No se pueden crear roles del sistema manualmente. Use seeders.'
    );
  }
  // ... crear rol
}
```

---

### 3. **Protección en RolePermissionService**

**Archivo:** `src/role-permission/role-permission.service.ts`

#### ✅ No se puede asignar permiso `*` a roles que NO sean SUPERADMIN:

```typescript
async create(createRolePermissionDto: CreateRolePermissionDto) {
  const role = await this.roleRepository.findOne({
    where: { id: createRolePermissionDto.roleId }
  });

  const permission = await this.permissionRepository.findOne({
    where: { id: createRolePermissionDto.permissionId }
  });

  // 🔒 PROTECCIÓN CRÍTICA: Solo SUPERADMIN puede tener permiso '*'
  if (permission.code === '*' && role.code !== 'SUPERADMIN') {
    throw new ForbiddenException(
      'El permiso wildcard "*" solo puede ser asignado al rol SUPERADMIN.'
    );
  }
  // ... crear asignación
}
```

#### ✅ No se pueden modificar permisos del rol SUPERADMIN:

```typescript
async update(id: number, updateRolePermissionDto: UpdateRolePermissionDto) {
  const rolePermission = await this.findOne(id);

  // 🔒 No se pueden modificar permisos del SUPERADMIN
  if (rolePermission.role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'No se pueden modificar los permisos del rol SUPERADMIN.'
    );
  }
  // ... resto de validaciones
}
```

#### ✅ No se pueden eliminar permisos del rol SUPERADMIN:

```typescript
async remove(id: number) {
  const rolePermission = await this.findOne(id);

  // 🔒 No se pueden eliminar permisos del SUPERADMIN
  if (rolePermission.role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'No se pueden eliminar permisos del rol SUPERADMIN.'
    );
  }
  // ... eliminar
}
```

---

### 4. **Protección en UserRoleService**

**Archivo:** `src/user-role/user-role.service.ts`

#### ✅ No se puede asignar rol SUPERADMIN a usuarios:

```typescript
async create(createUserRoleDto: CreateUserRoleDto) {
  const role = await this.roleRepository.findOne({
    where: { id: createUserRoleDto.roleId }
  });

  // 🔒 PROTECCIÓN CRÍTICA: No se puede asignar SUPERADMIN mediante API
  if (role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'No se puede asignar el rol SUPERADMIN a usuarios mediante esta API. Solo mediante seeders.'
    );
  }
  // ... crear asignación
}
```

#### ✅ No se pueden modificar asignaciones del rol SUPERADMIN:

```typescript
async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
  const userRole = await this.findOne(id);

  // 🔒 No se pueden modificar asignaciones de SUPERADMIN
  if (userRole.role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'No se pueden modificar las asignaciones del rol SUPERADMIN.'
    );
  }
  // ... resto de validaciones
}
```

#### ✅ No se pueden eliminar asignaciones del rol SUPERADMIN:

```typescript
async remove(id: number) {
  const userRole = await this.findOne(id);

  // 🔒 No se pueden eliminar asignaciones de SUPERADMIN
  if (userRole.role.code === 'SUPERADMIN') {
    throw new ForbiddenException(
      'No se pueden eliminar las asignaciones del rol SUPERADMIN.'
    );
  }
  // ... eliminar
}
```

---

### 5. **Protección a Nivel de Endpoints (Guards)**

**Todos los endpoints críticos están protegidos:**

```typescript
// RoleController
@Controller('role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede gestionar

// RolePermissionController
@Controller('role-permission')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede gestionar

// UserRoleController
@Controller('user-role')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Permissions('roles:manage') // Solo superadmin puede gestionar
```

**Resultado:** Un usuario normal (técnico, secretaria, etc.) **NO puede acceder** a estos endpoints, incluso si intenta hacer llamadas directas a la API.

---

## 🔐 Protección Contra Inyección SQL

### ✅ TypeORM usa Parámetros Preparados

TypeORM **automáticamente** usa parámetros preparados en todas las consultas, lo que previene inyección SQL:

```typescript
// ✅ SEGURO - TypeORM usa parámetros preparados automáticamente
const role = await this.roleRepository.findOne({
  where: { id: id }, // Se convierte en: SELECT * FROM role WHERE id = ? (parámetro preparado)
});

// ✅ SEGURO - Validación por código, no por ID
if (role.code === 'SUPERADMIN') {
  // Verificación por código string literal
  throw new ForbiddenException('...');
}
```

### ✅ Validación por Código, No por ID

Las protecciones verifican el **código del rol** (`role.code === 'SUPERADMIN'`), no el ID, lo que previene:

- Modificación directa de la base de datos
- Intentos de usar IDs diferentes
- Cambios de nombre que no afectan el código

---

## 📊 Resumen de Protecciones

| Acción                               | Protección                                        | Resultado |
| ------------------------------------ | ------------------------------------------------- | --------- |
| **Modificar rol SUPERADMIN**         | ✅ Bloqueado en `RoleService.update()`            | Error 403 |
| **Eliminar rol SUPERADMIN**          | ✅ Bloqueado en `RoleService.remove()`            | Error 403 |
| **Asignar permiso `*` a otro rol**   | ✅ Bloqueado en `RolePermissionService.create()`  | Error 403 |
| **Asignar rol SUPERADMIN a usuario** | ✅ Bloqueado en `UserRoleService.create()`        | Error 403 |
| **Modificar permisos de SUPERADMIN** | ✅ Bloqueado en `RolePermissionService救update()` | Error 403 |
| **Eliminar permisos de SUPERADMIN**  | ✅ Bloqueado en `RolePermissionService.remove()`  | Error 403 |
| **Acceso a endpoints sin permiso**   | ✅ Bloqueado por `@Permissions('roles:manage')`   | Error 403 |
| **Inyección SQL**                    | ✅ Prevenido por TypeORM (parámetros preparados)  | N/A       |

---

## 🧪 Escenarios de Ataque Prevenidos

### ❌ Escenario 1: Técnico intenta asignarse permiso `*`

```bash
# Intento del técnico
POST /role-permission
{
  "roleId": 3,  # ID del rol TECNICO
  "permissionId": 50  # ID del permiso '*'
}

# Resultado: 403 Forbidden
# "El permiso wildcard '*' solo puede ser asignado al rol SUPERADMIN."
```

### ❌ Escenario 2: Técnico intenta asignarse rol SUPERADMIN

```bash
# Intento del técnico
POST /user-role
{
  "userId": 2,  # Su propio ID
  "roleId": 1   # ID del rol SUPERADMIN
}

# Resultado: 403 Forbidden
# "No se puede asignar el rol SUPERADMIN a usuarios mediante esta API."
```

### ❌ Escenario 3: Intentar modificar el rol SUPERADMIN

```bash
# Intento
PATCH /role/1
{
  "code": "SUPERADMIN_HACKED",
  "isSystem": false
}

# Resultado: 403 Forbidden
# "El rol SUPERADMIN es inmutable. No se puede modificar de ninguna manera."
```

### ❌ Escenario 4: Inyección SQL intentando modificar el código

```sql
-- Intento de inyección SQL (no funcionará)
UPDATE role SET code = 'SUPERADMIN' WHERE code = 'TECNICO';
```

**Protección:**

- TypeORM usa transacciones y validaciones
- El código se verifica en el servicio, no solo en la base de datos
- Incluso si se modifica en la BD, el servicio siempre verifica por código

### ❌ Escenario 5: Acceso directo sin permisos

```bash
# Usuario técnico intenta acceder
GET /role-permission
# Sin permiso 'roles:manage'

# Resultado: 403 Forbidden
# "No tiene permisos suficientes"
```

---

## 🔍 Verificación de Código vs ID

### ✅ Por qué verificamos por código y no por ID:

1. **El código es inmutable:** Una vez creado por el seeder, no puede cambiarse
2. **El ID puede variar:** Depende del orden de creación en la base de datos
3. **Más seguro:** Verificar `role.code === 'SUPERADMIN'` es más confiable que `role.id === 1`

### Ejemplo:

```typescript
// ✅ CORRECTO - Verificación por código
if (role.code === 'SUPERADMIN') {
  // Protección activa
}

// ❌ INCORRECTO - Verificación por ID (vulnerable)
if (role.id === 1) {
  // Podría cambiar si se borra y recrea la BD
}
```

---

## 📝 Checklist de Seguridad

- [x] Solo SUPERADMIN tiene `isSystem: true`
- [x] Rol SUPERADMIN no se puede modificar
- [x] Rol SUPERADMIN no se puede eliminar
- [x] Permiso `*` solo asignable a SUPERADMIN
- [x] No se puede asignar rol SUPERADMIN mediante API
- [x] Permisos de SUPERADMIN no se pueden modificar
- [x] Endpoints protegidos con `@Permissions('roles:manage')`
- [x] TypeORM usa parámetros preparados (previene SQL injection)
- [x] Validación por código, no por ID

---

## 🎯 Conclusión

El rol **SUPERADMIN** está completamente protegido mediante múltiples capas de seguridad:

1. **Nivel de Seeder:** Solo se crea un SUPERADMIN con procesar `true`
2. **Nivel de Servicio:** Bloqueo total de modificaciones
3. **Nivel de Endpoint:** Solo superadmin puede acceder
4. **Nivel de Base de Datos:** TypeORM previene inyección SQL
5. **Validación por Código:** Verificación por string literal, no ID

**Un usuario técnico NO puede:**

- ❌ Asignarse el rol SUPERADMIN
- ❌ Asignarse el permiso `*`
- ❌ Modificar el rol SUPERADMIN
- ❌ Acceder a endpoints de gestión de roles/permisos
- ❌ Ejecutar inyección SQL exitosamente

**Solo puede:**

- ✅ Usar sus permisos asignados (lectura de instalaciones, tickets, etc.)
- ✅ Operar dentro de los límites de su rol TECNICO

---

**Fecha de implementación:** {{ fecha }}  
**Estado:** ✅ PROTEGIDO
