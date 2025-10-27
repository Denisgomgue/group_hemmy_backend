# 🌱 Seeders de Base de Datos

Este directorio contiene todos los seeders organizados de manera modular para fácil mantenimiento.

## 📁 Estructura

```
database/
├── seeders/
│   ├── database-seeder.module.ts      # Módulo NestJS para inyectar dependencias
│   ├── database-seeders.service.ts    # Servicio principal que orquesta todos los seeders
│   ├── inventory-seeder.service.ts    # Seeder de categorías de equipamiento
│   ├── user-seeder.service.ts         # Seeder de usuario administrador
│   ├── resource.seeder.ts             # Configuración de datos iniciales (centralizada)
│   └── run-seeders.ts                 # Punto de entrada para ejecutar seeders
└── migrations/                        # Migraciones de base de datos (futuro)
```

## 🎯 Arquitectura

### Servicio Principal (`database-seeders.service.ts`)

- Orquesta la ejecución de todos los seeders
- Punto de entrada único para ejecutar todos los seeders

### Servicios Específicos

- **`inventory-seeder.service.ts`**: Carga categorías de equipamiento
- **`user-seeder.service.ts`**: Carga usuario administrador por defecto
- **`resource.seeder.ts`**: Archivo de configuración centralizada con todos los datos iniciales

### Módulo NestJS (`database-seeder.module.ts`)

- Define las dependencias y exports de los servicios de seeders
- Permite la inyección de dependencias en el contexto de NestJS

## 📝 Agregar Nuevos Seeders

### 1. Crear el servicio del seeder

```typescript
// src/database/seeders/nuevo-seeder.service.ts
import { Injectable } from '@nestjs/common';
import { SEEDER_CONFIG } from './resource.seeder';

@Injectable()
export class NuevoSeederService {
  constructor(private readonly miServicio: MiServicio) {}

  async seedNuevo() {
    console.log('🌱 Seeding nuevos datos...');
    // Tu lógica de seeder aquí
  }
}
```

### 2. Agregar configuración en `resource.seeder.ts`

```typescript
export const SEEDER_CONFIG = {
  // ... configuración existente
  nuevosDatos: [
    // tus datos aquí
  ],
};
```

### 3. Registrar en el módulo

```typescript
// database-seeder.module.ts
import { NuevoSeederService } from './nuevo-seeder.service';

@Module({
  providers: [
    // ... otros providers
    NuevoSeederService,
  ],
})
```

### 4. Ejecutar en el servicio principal

```typescript
// database-seeders.service.ts
async runAllSeeders() {
  await this.nuevoSeederService.seedNuevo();
  // ... otros seeders
}
```

## 🚀 Ejecución

### Automática (Desarrollo)

Los seeders se ejecutan automáticamente al iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

### Manual

Ejecutar seeders manualmente:

```bash
npm run seed
# o
npm run seed:all
```

## 🔧 Configuración

Todos los datos iniciales están centralizados en `resource.seeder.ts`:

```typescript
export const SEEDER_CONFIG = {
  equipmentCategories: [
    /* ... */
  ],
  adminUser: {
    email: 'admin@hemmy.com',
    password: 'admin123',
    // ...
  },
};
```

Para cambiar los datos iniciales, edita únicamente este archivo.

## 📊 Seeders Disponibles

### ✅ Implementados

- **Categorías de Equipamiento** - 8 categorías básicas
- **Usuario Administrador** - Usuario por defecto para acceder al sistema

### 📋 Pendientes (Futuro)

- Roles y permisos
- Sectores
- Planes de servicio
- Otros datos maestros

## 🎨 Ventajas de esta Estructura

1. **Organización**: Todo relacionado con seeders está en un solo lugar
2. **Modularidad**: Cada seeder es independiente y fácil de mantener
3. **Reutilización**: Los datos están centralizados en `resource.seeder.ts`
4. **Escalabilidad**: Fácil agregar nuevos seeders
5. **Mantenibilidad**: Cambios rápidos sin tocar múltiples archivos
