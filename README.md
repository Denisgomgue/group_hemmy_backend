# Grupo Hemmy Backend

Backend para el sistema de gestión de ISP Grupo Hemmy desarrollado con NestJS.

## 🚀 Características

- **Framework**: NestJS con TypeScript
- **Base de Datos**: MySQL con TypeORM
- **Validación**: class-validator y class-transformer
- **Arquitectura**: Modular con recursos separados

## 📦 Módulos Implementados

### 1. Equipment (Equipos)

- Gestión de equipos de cliente, empleado y empresa
- Estados: STOCK, ASSIGNED, SOLD, MAINTENANCE, LOST, USED
- Tipos de uso: CLIENT, EMPLOYEE, COMPANY

### 2. Equipment Categories (Categorías de Equipos)

- Categorías para clasificar equipos
- Estados: ACTIVE, INACTIVE
- Campos: name, description, color

### 3. Equipment History (Historial de Equipos)

- Auditoría completa de movimientos de equipos
- Tipos de acción: assignment, transfer, maintenance, return, retirement, location_change

### 4. Person (Personas)

- Gestión básica de personas
- Campos: firstName, lastName, email, phone, documentNumber, address

## 🛠️ Instalación

1. **Instalar dependencias**:

```bash
npm install
```

2. **Configurar base de datos**:

- Crear base de datos MySQL: `group_hemmy`
- Configurar variables de entorno (crear archivo `.env`):

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=group_hemmy
PORT=3000
NODE_ENV=development
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

3. **Ejecutar la aplicación**:

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Equipment

- `GET /equipment` - Listar todos los equipos
- `POST /equipment` - Crear nuevo equipo
- `GET /equipment/:id` - Obtener equipo por ID
- `PUT /equipment/:id` - Actualizar equipo
- `DELETE /equipment/:id` - Eliminar equipo

### Equipment Categories

- `GET /equipment-categories` - Listar todas las categorías
- `POST /equipment-categories` - Crear nueva categoría
- `GET /equipment-categories/:id` - Obtener categoría por ID
- `PUT /equipment-categories/:id` - Actualizar categoría
- `DELETE /equipment-categories/:id` - Eliminar categoría

### Equipment History

- `GET /equipment-history` - Listar todo el historial
- `POST /equipment-history` - Crear nuevo registro de historial
- `GET /equipment-history/:id` - Obtener registro por ID
- `PUT /equipment-history/:id` - Actualizar registro
- `DELETE /equipment-history/:id` - Eliminar registro

### Person

- `GET /person` - Listar todas las personas
- `POST /person` - Crear nueva persona
- `GET /person/:id` - Obtener persona por ID
- `PUT /person/:id` - Actualizar persona
- `DELETE /person/:id` - Eliminar persona

## 🗄️ Estructura de Base de Datos

### Tabla: equipment

- `id` (PK)
- `serialNumber` (string, nullable)
- `macAddress` (string, nullable)
- `brand` (string, nullable)
- `model` (string, nullable)
- `status` (enum: STOCK, ASSIGNED, SOLD, MAINTENANCE, LOST, USED)
- `assignedDate` (date, nullable)
- `useType` (enum: CLIENT, EMPLOYEE, COMPANY)
- `assignedInstallationId` (number, nullable)
- `assignedEmployeeId` (number, nullable)
- `categoryId` (number, nullable)
- `notes` (string, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Tabla: equipment_categories

- `id` (PK)
- `name` (string)
- `description` (string, nullable)
- `color` (string, nullable)
- `status` (enum: active, inactive)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Tabla: equipment_history

- `id` (PK)
- `actionType` (enum: assignment, transfer, maintenance, return, retirement, location_change)
- `fromLocation` (string, nullable)
- `toLocation` (string, nullable)
- `reason` (string, nullable)
- `notes` (string, nullable)
- `actionDate` (timestamp)
- `performedBy` (number, nullable)
- `equipmentId` (number, nullable)
- `fromClientId` (number, nullable)
- `toClientId` (number, nullable)
- `fromInstallationId` (number, nullable)
- `toInstallationId` (number, nullable)
- `fromEmployeeId` (number, nullable)
- `toEmployeeId` (number, nullable)

### Tabla: person

- `id` (PK)
- `firstName` (string)
- `lastName` (string)
- `email` (string, nullable)
- `phone` (string, nullable)
- `documentNumber` (string, nullable)
- `address` (string, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## 🔧 Desarrollo

### Agregar nuevo recurso:

```bash
nest g resource nombre-recurso --no-spec
```

### Estructura recomendada:

1. Crear entidad con enums para catálogos
2. Configurar módulo con TypeORM
3. Implementar servicio con Repository pattern
4. Crear DTOs con validaciones
5. El controlador se genera automáticamente

## 📝 Notas

- Los enums se definen directamente en las entidades
- No se usan tablas separadas para catálogos
- Estructura simple y funcional
- Validaciones básicas con class-validator
- Relaciones simples con TypeORM
