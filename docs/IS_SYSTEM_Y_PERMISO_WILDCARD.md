# 🔒 Uso de `isSystem` y Permiso Wildcard `*`

## 📋 Resumen

Este documento explica:
1. **Campo `isSystem`**: Para proteger roles críticos del sistema
2. **Permiso Wildcard `*`**: Cómo se registra y funciona para el superadmin

---

## 1. Campo `isSystem` en la Tabla Role

### 🎯 Propósito

El campo `isSystem: boolean` identifica roles que son **esenciales** para el funcionamiento del sistema y deben estar protegidos.

### 📊 Roles del Sistema (isSystem: true)

- ✅ **SUPERADMIN** - Rol crítico, no debe eliminarse ni modificarse
- ✅ **ADMINISTRADOR** - Rol por defecto, necesario para operación
- ✅ **TECNICO** - Rol funcional del sistema
- ✅ **SECRETARIA** - Rol funcional del sistema

### 🛡️ Protecciones que debemos implementar

1. **No eliminar roles del sistema**
2. **No modificar el `code` de roles del sistema** (es crítico para el código)
3. **Prevenir cambio de `isSystem` a `false`** para roles críticos
4. **Restringir creación de roles con `isSystem: true`** (solo en seeders)

---

## 2. Permiso Wildcard `*`

### 🎯 Propósito

El permiso `几千` permite acceso total al sistema. Solo debe ser asignado al rol **SUPERADMIN**.

### 📝 Cómo se Registra

**Problema actual:** El seeder asigna TODOS los permisos cuando encuentra `*`, pero no crea un permiso literal `*` en la tabla `Permission`.

**Solución:** Necesitamos crear un permiso literal con `code: '*'` en la tabla Permission para que el guard pueda verificarlo correctamente.

### 🔄 Flujo Actual (en el seeder)

```typescript
// En resource.seeder.ts
rolePermissions: [
  { roleCode: 'SUPERADMIN', permissions: [ '*', 'roles:manage' ] }
]

// En user-seeder.service.ts
for (const permCode of rolePermData.permissions) {
  if (permCode === '*') {
    // ✅ Asigna TODOS los permisos existentes
    for (const perm of permissionsMap.values()) {
      const rolePerm = this.rolePermissionRepository.create({ role, permission: perm });
      await this.rolePermissionRepository.save(rolePerm);
    }
  }
}
```

**Problema:** No se crea un permiso literal `*` que el guard pueda verificar.

---

## ✅ Solución Implementada

### 1. Crear Permiso Literal `*`

Modificar el seeder para crear un permiso literal con código `*`:

```typescript
// En resource.seeder.ts
permissions: [
  // ... otros permisos
  { 
    code: '*', 
    name: 'Todos los Permisos', 
    description: 'Permiso wildcard que otorga acceso total al sistema. Solo para SUPERADMIN.' 
  },
]
```

### 2. Asignar Permiso `*` Literal al SUPERADMIN

En el seeder, cuando encontramos `*`:
1. ✅ Asignar TODOS los permisos existentes (comportamiento actual)
2. ✅ Asignar también el permiso literal `*` (nuevo)

### 3. Validar `isSystem` en Servicios

Proteger roles del sistema en las operaciones CRUD.

---

## 🔧 Implementación

### Paso 1: Actualizar Seeder para crear permiso `* celebration`

```typescript
// resource.seeder.ts
permissions: [
  // ... otros permisos
  {
    code: '*',
    name: 'Todos los Permisos',
    description: 'Permiso wildcard que otorga acceso total al sistema. Solo para SUPERADMIN.',
  },
]
```

### Paso 2: Modificar lógica de asignación

```typescript
// user-seeder.service.ts
for (const permCode of rolePermData.permissions) {
  if (permCode === '*') {
    // 1. Asignar TODOS los permisos existentes
    for (const perm of permissionsMap.values()) {
      const rolePerm = this.rolePermissionRepository.create({ role, permission: perm });
      await this.rolePermissionRepository.save(rolePerm);
    }
    
    // 2. Asignar también el permiso literal '*'
    const wildcardPerm = permissionsMap.get('*');
    if (wildcardPerm) {
      // Ya está incluido en el loop anterior, pero lo verificamos explícitamente
      console.log(`  ✅ Permiso wildcard '*' asignado al rol ${role.name}`);
    }
    
    console.log(`  ✅ Todos los permisos asignados al rol ${role.name}`);
  } else {
    // Asignar permiso específico
    const perm = permissionsMap.get(permCode);
    if (perm) {
      const rolePerm = this.rolePermissionRepository.create({ role, permission: perm });
      await this.rolePermissionRepository.save(rolePerm);
    }
  }
}
```

### Paso 3: Proteger roles con `isSystem` en servicios

Implementar validaciones en `RoleService`:

```typescript
async remove(id: number) {
  const role = await this.roleRepository.findOne({ where: { id } });
  
  if (!role) {
    throw new NotFoundException('Rol no encontrado');
  }
  
  // Prevenir eliminar roles del sistema
  if (role.isSystem) {
    throw new ForbiddenException('No se puede eliminar un rol del sistema');
  }
  
  return this.roleRepository.remove(role);
}

async update(id: number, updateRoleDto: UpdateRoleDto) {
  const role = await this.roleRepository.findOne({ where: { id } });
  
  if (!role) {
    throw new NotFoundException('Rol no encontrado');
  }
  
  // Prevenir modificar el código de roles del sistema
  if (role.isSystem && updateRoleDto.code && updateRoleDto.code !== role.code) {
    throw new ForbiddenException('No se puede modificar el código de un rol del sistema');
  }
  
  // Prevenir cambiar isSystem de true a false en roles críticos
  if (role.isSystem && updateRoleDto.isSystem === false && role.code === 'SUPERADMIN') {
    throw new ForbiddenException('No se puede desactivar el flag isSystem del rol SUPERADMIN');
  }
  
  Object.assign(role, updateRoleDto);
  return this.roleRepository.save(role);
}

async create(createRoleDto: CreateRoleDto) {
  // Prevenir crear roles con isSystem: true manualmente
  // Solo deben crearse vía seeders
  if (createRoleDto.isSystem === true) {
    throw new ForbiddenException('No se pueden crear roles del sistema manualmente. Use seeders.');
  }
  
  const role = this.roleRepository.create(createRoleDto);
  return this.roleRepository.save(role);
}
```

---

## 📊 Estructura Final

### Tabla Permission

| id | code      | name            | description                                  |
|----|-----------|-----------------|----------------------------------------------|
| 1  | users:read| Ver Usuarios    | ...                                          |
| ...| ...       | ...             | ...                                          |
| 50 | *         | Kaplan Permisos | Permiso wildcard para acceso total           |
| 51 | roles:manage | Gestionar Roles | ...                                      |

### Tabla Role

| id | code        | name              | isSystem |
|----|-------------|-------------------|----------|
| 1  | SUPERADMIN  | Super Administrador | true    |
| 2  | ADMINISTRADOR | Administrador    | true    |
| 3  | TECNICO     | Técnico           | true    |
| 4  | SECRETARIA  | Secretaria        | true    |
| 5  | CUSTOM_ROLE | Rol Personalizado | false   |

### Tabla RolePermission

| roleId | permissionId | (permiso asignado)           |
|--------|--------------|------------------------------|
| 1      | 50           | '*' (wildcard)               |
| 1      | 1            | 'users:read'                 |
| 1      | 2            | 'users:create'               |
| ...    | ...          | (todos los permisos)         |
| 1      | 51           | 'roles:manage'               |

---

## 🔍 Cómo Funciona el Guard

### PermissionsGuard

```typescript
private extractPermissions(user: any): string[] {
  const permissions: string[] = [];
  
  // Extraer permisos del usuario
  user.roles?.forEach((userRole: any) => {
    userRole.role?.permissions?.forEach((rp: any) => {
      const permCode = rp.permission?.code || rp.code;
      if (permCode) {
        permissions.push(permCode); // Incluye '*' si existe
      }
    });
  });
  
  return [...new Set(permissions)];
}

async canActivate(context: ExecutionContext): Promise<boolean> {
  const userPermissions = this.extractPermissions(user);
  
  // Si tiene permiso '*', permitir TODO
  if (userPermissions.includes('*')) {
    return true; // ✅ Acceso total
  }
  
  // Verificar permisos específicos
  // ...
}
```

---

## ✅ Checklist de Implementación

- [ ] Agregar permiso `*` literal a `resource.seeder.ts`
- [ ] Modificar seeder para crear permiso `*` en la base de datos
- [ ] Implementar validaciones `isSystem` en `RoleService`
- [ ] Prevenir eliminación de roles con `isSystem: true`
- [ ] Prevenir modificación de `code` en roles del sistema
- [ ] Prevenir creación manual de roles con `isSystem: true`
- [ ] Actualizar documentación

---

## 📚 Referencias

- Ver `EVALUACION_SEGURIDAD_PERMISOS.md` para más sobre seguridad
- Ver `VULNERABILIDAD_CRITICA_RESUELTA.md` para protección de endpoints

