# Análisis del Esquema de Base de Datos - Grupo Hemmy

## 📋 Resumen del Esquema

Este esquema está diseñado para un sistema de gestión de telecomunicaciones/ISP que maneja:

- **Equipos**: Inventario físico de equipos de red
- **Clientes**: Personas y organizaciones con servicios
- **Instalaciones**: Ubicaciones donde se instalan servicios
- **Facturación**: Sistema completo de facturación y pagos
- **Tickets**: Sistema de soporte técnico
- **RBAC**: Control de acceso basado en roles

## 🏗️ Estructura Modular

### 1. **Módulo de Equipos** 📦

```
equipment_status (catálogo)
equipment_category (catálogo)
equipment_model (modelos por categoría)
supplier (proveedores)
warehouse (almacenes)
equipment_item (ítems físicos por serie/MAC)
```

**Características clave:**

- **Normalización**: Separación clara entre modelos y ítems físicos
- **Trazabilidad**: Seguimiento completo desde compra hasta asignación
- **Flexibilidad**: Soporte para diferentes tipos de equipos (router, ONT, radio, etc.)
- **Inventario**: Control de almacenes y estados

### 2. **Módulo de Identidad** 👤

```
person (personas físicas)
organization (organizaciones)
actor (identidad unificada)
client (clientes del servicio)
employee (empleados)
user (usuarios del sistema)
```

**Características clave:**

- **Actor Pattern**: Unificación de personas y organizaciones
- **Flexibilidad**: Soporte para clientes individuales y empresariales
- **Seguridad**: Separación entre identidad y autenticación

### 3. **Módulo de Instalaciones** 🏠

```
sector (zonas geográficas)
installation (instalaciones de servicio)
address (direcciones detalladas)
```

**Características clave:**

- **Geolocalización**: Organización por sectores
- **Flexibilidad**: Múltiples direcciones por actor/instalación
- **Trazabilidad**: Historial de ubicaciones

### 4. **Módulo de Servicios** 🌐

```
service (tipos de servicio)
plan (planes de servicio)
subscription (suscripciones activas)
```

**Características clave:**

- **Flexibilidad**: Múltiples servicios por instalación
- **Facturación**: Integración directa con sistema de facturación
- **Configurabilidad**: Días de facturación y pagos adelantados

### 5. **Módulo de Tickets** 🎫

```
ticket_type, ticket_priority, ticket_status, ticket_outcome (catálogos)
ticket (tickets de soporte)
```

**Características clave:**

- **Agenda**: Sistema de programación de visitas
- **Trazabilidad**: Seguimiento completo del ciclo de vida
- **Flexibilidad**: Soporte para diferentes tipos de tickets

### 6. **Módulo de Facturación** 💰

```
invoice_status, charge_type (catálogos)
invoice (facturas)
invoice_item (líneas de factura)
invoice_ledger (histórico de cambios)
```

**Características clave:**

- **Auditoría**: Histórico completo de cambios
- **Flexibilidad**: Múltiples tipos de cargos
- **Integridad**: Sistema append-only para auditoría

### 7. **Módulo de Pagos** 💳

```
payment_status, payment_method (catálogos)
payment (recibos de pago)
payment_item (aplicación de pagos a facturas)
payment_deferral (aplazamientos)
```

**Características clave:**

- **Flexibilidad**: Múltiples métodos de pago
- **Trazabilidad**: Seguimiento de aplazamientos
- **Integridad**: Sistema de anulación con auditoría

### 8. **Módulo RBAC** 🔐

```
role (roles del sistema)
permission (permisos granulares)
role_permission (asignación de permisos a roles)
user_role (asignación de roles a usuarios)
user_permission (permisos específicos por usuario)
```

**Características clave:**

- **Granularidad**: Permisos específicos por funcionalidad
- **Flexibilidad**: Roles del sistema + permisos individuales
- **Seguridad**: Sistema de denegación que prevalece sobre concesión

## 🎯 Análisis del Módulo de Equipos - ISP Simplificado

### **Contexto del Negocio:**

Para un ISP que provee servicios de internet por **fibra óptica** e **inalámbrico**, el módulo de equipos se enfoca en:

- **Equipos de Cliente**: Routers, ONTs, Decodificadores que se instalan en hogares
- **Equipos de Empleado**: Equipos asignados a técnicos para instalaciones
- **Equipos de Empresa**: Equipos internos de la empresa
- **Seguimiento Simple**: Historial de asignaciones y cambios de ubicación

### **Estructura Simplificada:**

#### **1. Tabla Principal: `equipment`** 📦

```sql
CREATE TABLE `equipment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serialNumber` varchar(255) DEFAULT NULL,
  `macAddress` varchar(255) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `status` enum('STOCK','ASSIGNED','SOLD','MAINTENANCE','LOST','USED') NOT NULL,
  `assignedDate` date DEFAULT NULL,
  `useType` enum('CLIENT','EMPLOYEE','COMPANY') NOT NULL,
  `assignedInstallationId` int(11) DEFAULT NULL,
  `assignedEmployeeId` int(11) DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `categoryId` int(11) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL
);
```

#### **2. Tabla de Historial: `equipment_history`** 📋

```sql
CREATE TABLE `equipment_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_type` enum('assignment','transfer','maintenance','return','retirement','location_change') NOT NULL,
  `fromLocation` varchar(255) DEFAULT NULL,
  `toLocation` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `actionDate` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `performedBy` int(11) DEFAULT NULL,
  `equipmentId` int(11) DEFAULT NULL,
  `fromClientId` int(11) DEFAULT NULL,
  `toClientId` int(11) DEFAULT NULL,
  `fromInstallationId` int(11) DEFAULT NULL,
  `toInstallationId` int(11) DEFAULT NULL,
  `fromEmployeeId` int(11) DEFAULT NULL,
  `toEmployeeId` int(11) DEFAULT NULL
);
```

#### **3. Tabla de Categorías: `equipment_categories`** 🏷️

```sql
CREATE TABLE `equipment_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
);
```

### **Fortalezas del Diseño Simplificado:**

1. **Simplicidad y Funcionalidad**:
   - Una sola tabla `equipment` con toda la información necesaria
   - Estados claros y específicos para el negocio ISP
   - Tipos de uso bien definidos (CLIENT, EMPLOYEE, COMPANY)

2. **Trazabilidad Completa**:
   - Historial detallado en `equipment_history` para auditoría
   - Seguimiento de cambios de ubicación y asignaciones
   - Registro de quién realizó cada acción

3. **Estados Específicos para ISP**:
   - `STOCK`: En inventario disponible
   - `ASSIGNED`: Asignado a cliente/empleado
   - `SOLD`: Vendido al cliente
   - `MAINTENANCE`: En mantenimiento
   - `LOST`: Perdido o robado
   - `USED`: En uso activo

4. **Flexibilidad de Asignación**:
   - Puede asignarse a instalación (`assignedInstallationId`)
   - Puede asignarse a empleado (`assignedEmployeeId`)
   - Tipo de uso específico (`useType`)

### **Categorías Sugeridas para ISP:**

```sql
-- Categorías específicas para equipos de ISP
INSERT INTO equipment_categories (name, description, color) VALUES
('Router WiFi', 'Routers inalámbricos para clientes', '#3498db'),
('ONT Fibra', 'Terminales ópticos de red', '#e74c3c'),
('Decodificador', 'Decodificadores de TV/Internet', '#f39c12'),
('Antena Cliente', 'Antenas para clientes inalámbricos', '#2ecc71'),
('Radio Base', 'Equipos de radio para técnicos', '#9b59b6'),
('Switch', 'Switches de red', '#34495e'),
('UPS', 'Sistemas de respaldo', '#e67e22'),
('Cable', 'Cables de red y fibra', '#95a5a6');
```

### **Consideraciones de Implementación Simplificada:**

1. **Validaciones de Negocio**:

   ```sql
   -- Validaciones básicas pero efectivas
   -- Si status = ASSIGNED => assignedInstallationId o assignedEmployeeId debe ser NOT NULL
   -- Si status = SOLD => assignedInstallationId debe ser NOT NULL
   -- Si status = MAINTENANCE => assignedEmployeeId debe ser NOT NULL
   -- Serial y MAC deben ser únicos cuando no son NULL
   ```

2. **Índices Recomendados**:

   ```sql
   -- equipment
   UNIQUE(serialNumber) WHERE serialNumber IS NOT NULL
   UNIQUE(macAddress) WHERE macAddress IS NOT NULL
   INDEX(status, useType)
   INDEX(assignedInstallationId) WHERE assignedInstallationId IS NOT NULL
   INDEX(assignedEmployeeId) WHERE assignedEmployeeId IS NOT NULL
   INDEX(categoryId, status)

   -- equipment_history
   INDEX(equipmentId, actionDate)
   INDEX(action_type, actionDate)
   INDEX(performedBy, actionDate)
   ```

3. **Relaciones Simples con Otros Módulos**:

   #### **Con Módulo de Instalaciones**:
   - **Un equipo puede estar asignado a una instalación** (`assignedInstallationId`)
   - **Historial de equipos por instalación** en `equipment_history`

   #### **Con Módulo de Empleados**:
   - **Un equipo puede estar asignado a un empleado** (`assignedEmployeeId`)
   - **Historial de equipos por empleado** en `equipment_history`

   #### **Con Módulo de Tickets**:
   - **Tickets de instalación**: Referencia a equipos asignados
   - **Tickets de mantenimiento**: Referencia a equipos en mantenimiento
   - **Historial de intervenciones**: Registro en `equipment_history`

   #### **Con Módulo de Facturación**:
   - **Equipos vendidos**: Status = 'SOLD'
   - **Equipos en alquiler**: Status = 'ASSIGNED' con `useType = 'CLIENT'`
   - **Depósitos de garantía**: Para equipos cliente

### **Consideraciones de Implementación para ISP:**

1. **Validaciones de Negocio Específicas**:

   ```sql
   -- Estados y ubicaciones válidas
   -- Si status = IN_STOCK => warehouse_id NO NULL
   -- Si status = INSTALLED => installation_id NO NULL y warehouse_id NULL
   -- Si status = ASSIGNED => installation_id NO NULL pero aún no instalado
   -- Si status = MAINTENANCE => maintenance_record_id NO NULL

   -- Validaciones por tipo de equipo
   -- Equipos de fibra: deben tener fiber_type y connector_type
   -- Equipos inalámbricos: deben tener frequency_band y power_output
   -- Equipos de red: deben tener port_count y switching_capacity
   ```

2. **Índices Recomendados para ISP**:

   ```sql
   -- equipment_item
   UNIQUE(serial_number) WHERE serial_number IS NOT NULL
   UNIQUE(mac_address) WHERE mac_address IS NOT NULL
   UNIQUE(imei) WHERE imei IS NOT NULL
   INDEX(status_code, warehouse_id)
   INDEX(equipment_model_id, status_code)
   INDEX(installation_id) WHERE installation_id IS NOT NULL
   INDEX(purchase_date, warranty_end_date)

   -- equipment_model
   UNIQUE(brand, model, part_number)
   INDEX(category_id, brand)
   INDEX(equipment_type, power_consumption)

   -- Búsquedas frecuentes
   INDEX(serial_number, mac_address) -- Para búsquedas rápidas
   INDEX(status_code, warehouse_id, category_id) -- Para inventario
   ```

3. **Relaciones Específicas con Otros Módulos**:

   #### **Con Módulo de Instalaciones**:
   - **Un equipo puede estar asignado a una instalación** (`installation_id`)
   - **Un equipo puede tener múltiples ubicaciones históricas** (auditoría)
   - **Equipos de fibra**: Relación con `fiber_cable` y `splitter`
   - **Equipos inalámbricos**: Relación con `antenna_mount` y `tower`

   #### **Con Módulo de Tickets**:
   - **Tickets de instalación**: Referencia a equipos instalados
   - **Tickets de mantenimiento**: Referencia a equipos en reparación
   - **Tickets de falla**: Referencia a equipos con problemas
   - **Historial de intervenciones**: Auditoría completa

   #### **Con Módulo de Facturación**:
   - **Cargos por equipo**: Alquiler de equipos cliente
   - **Depósitos de garantía**: Para equipos cliente
   - **Cargos de instalación**: Por equipos instalados
   - **Penalizaciones**: Por equipos perdidos o dañados

   #### **Con Módulo de Servicios**:
   - **Servicios de fibra**: Requieren ONT específico
   - **Servicios inalámbricos**: Requieren radio y antena específicos
   - **Planes de servicio**: Limitados por capacidad del equipo
   - **Upgrades**: Requieren cambio de equipo

### **Campos Específicos para ISP:**

#### **equipment_model** (Modelo de Equipo):

```sql
-- Campos básicos
id, name, brand, model, part_number, description
category_id, supplier_id, created_at, updated_at

-- Campos específicos para ISP
equipment_type ENUM('FIBER', 'WIRELESS', 'NETWORK', 'CLIENT')
fiber_type ENUM('SINGLE_MODE', 'MULTI_MODE') -- Solo para equipos de fibra
connector_type ENUM('SC', 'LC', 'ST', 'FC') -- Solo para equipos de fibra
frequency_band VARCHAR(50) -- Solo para equipos inalámbricos (ej: '2.4GHz', '5GHz', '60GHz')
power_output DECIMAL(5,2) -- Solo para equipos inalámbricos (dBm)
port_count INTEGER -- Solo para equipos de red
switching_capacity VARCHAR(20) -- Solo para switches (ej: '48x1G')
power_consumption DECIMAL(6,2) -- Watts
operating_temperature VARCHAR(20) -- Rango de temperatura (ej: '-10°C a 50°C')
dimensions VARCHAR(50) -- Dimensiones físicas
weight DECIMAL(5,2) -- Peso en kg
warranty_months INTEGER -- Garantía en meses
```

#### **equipment_item** (Ítem Físico):

```sql
-- Campos básicos
id, equipment_model_id, serial_number, mac_address, imei
asset_tag, purchase_date, purchase_price, supplier_id
status_code, warehouse_id, installation_id, created_at, updated_at

-- Campos específicos para ISP
firmware_version VARCHAR(20) -- Versión de firmware actual
ip_address INET -- Dirección IP asignada (si aplica)
configuration_backup TEXT -- Backup de configuración
last_maintenance_date DATE -- Última fecha de mantenimiento
next_maintenance_date DATE -- Próxima fecha de mantenimiento programada
warranty_end_date DATE -- Fecha de fin de garantía
insurance_value DECIMAL(10,2) -- Valor asegurado
depreciation_rate DECIMAL(5,2) -- Tasa de depreciación anual
current_value DECIMAL(10,2) -- Valor actual calculado
```

#### **equipment_status** (Estados de Equipo):

```sql
-- Estados específicos para ISP
code, name, description, is_active, created_at, updated_at

-- Estados sugeridos:
'IN_STOCK' - En almacén disponible
'ASSIGNED' - Asignado a instalación
'INSTALLED' - Instalado en campo
'MAINTENANCE' - En mantenimiento
'REPAIR' - En reparación
'LOST' - Perdido o robado
'RETIRED' - Retirado del servicio
'RESERVED' - Reservado para instalación
'TESTING' - En pruebas
'QUARANTINE' - En cuarentena (equipos sospechosos)
```

#### **equipment_category** (Categorías de Equipo):

```sql
-- Categorías específicas para ISP
id, name, description, parent_id, is_active, created_at, updated_at

-- Categorías sugeridas:
'FIBER_OLT' - Equipos OLT centrales
'FIBER_ONT' - Terminales ópticos de cliente
'FIBER_SPLITTER' - Divisores ópticos
'FIBER_CABLE' - Cables de fibra óptica
'FIBER_CONNECTOR' - Conectores ópticos
'WIRELESS_RADIO' - Radios inalámbricos
'WIRELESS_ANTENNA' - Antenas
'WIRELESS_ACCESS_POINT' - Puntos de acceso WiFi
'NETWORK_SWITCH' - Switches de red
'NETWORK_ROUTER' - Routers de red
'NETWORK_FIREWALL' - Firewalls
'CLIENT_EQUIPMENT' - Equipos de cliente
'POWER_UPS' - Sistemas de respaldo
'TESTING_EQUIPMENT' - Equipos de prueba
```

## 🚀 Recomendaciones de Implementación

### **1. Orden de Creación de Módulos:**

1. **Catálogos básicos** (equipment_status, equipment_category, etc.)
2. **Módulo de identidad** (person, organization, actor, user)
3. **Módulo de equipos** (equipment_model, equipment_item)
4. **Módulo de instalaciones** (sector, installation)
5. **Módulo de servicios** (service, plan, subscription)
6. **Módulo de tickets** (ticket y catálogos)
7. **Módulo de facturación** (invoice, invoice_item)
8. **Módulo de pagos** (payment, payment_item)
9. **Módulo RBAC** (role, permission, etc.)

### **2. Consideraciones Técnicas:**

- **TypeORM**: Usar decoradores para validaciones
- **Enums**: Para códigos de estado y tipos
- **Soft Deletes**: Para auditoría
- **Timestamps**: Automáticos en todas las entidades
- **Validaciones**: A nivel de aplicación y base de datos

### **3. API Design:**

- **RESTful**: Endpoints estándar para cada módulo
- **Paginación**: Para listados grandes
- **Filtros**: Por estado, fecha, cliente, etc.
- **Búsquedas**: Por serial, MAC, cliente, etc.

## 📊 Métricas y Reportes Simplificados para ISP

### **Reportes de Inventario:**

#### **Por Estado:**

- Equipos en STOCK disponibles
- Equipos ASSIGNED a clientes/empleados
- Equipos SOLD a clientes
- Equipos en MAINTENANCE
- Equipos LOST (valor perdido)
- Equipos USED activos

#### **Por Tipo de Uso:**

- Equipos CLIENT (asignados a clientes)
- Equipos EMPLOYEE (asignados a técnicos)
- Equipos COMPANY (uso interno)

#### **Por Categoría:**

- Routers WiFi por estado
- ONTs de fibra por estado
- Decodificadores por estado
- Antenas cliente por estado
- Equipos de técnicos por estado

### **Reportes de Asignación:**

#### **Por Cliente/Instalación:**

- Equipos asignados por instalación
- Historial de equipos por cliente
- Equipos vendidos vs alquilados
- Equipos retornados por cliente

#### **Por Empleado:**

- Equipos asignados a técnicos
- Equipos en mantenimiento por técnico
- Historial de asignaciones por empleado
- Equipos perdidos por empleado

### **Reportes Financieros:**

#### **Valor de Inventario:**

- Valor total de equipos en STOCK
- Valor de equipos asignados
- Valor de equipos vendidos
- Pérdidas por equipos LOST

#### **Ingresos por Equipos:**

- Ventas de equipos (status = SOLD)
- Alquiler de equipos (status = ASSIGNED, useType = CLIENT)
- Depósitos de garantía por cobrar
- Penalizaciones por equipos perdidos

### **Reportes de Auditoría:**

#### **Historial de Movimientos:**

- Asignaciones por período
- Transferencias entre clientes
- Mantenimientos realizados
- Retiros de equipos
- Cambios de ubicación

#### **Trazabilidad:**

- Equipos por serial/MAC
- Historial completo por equipo
- Ubicación actual de cada equipo
- Responsable actual de cada equipo

### **Consultas Útiles:**

```sql
-- Equipos disponibles para asignar
SELECT * FROM equipment
WHERE status = 'STOCK'
ORDER BY categoryId, brand, model;

-- Equipos asignados a un cliente específico
SELECT e.*, c.name as client_name
FROM equipment e
JOIN installations i ON e.assignedInstallationId = i.id
JOIN clients c ON i.clientId = c.id
WHERE e.useType = 'CLIENT' AND e.status IN ('ASSIGNED', 'SOLD');

-- Historial de un equipo específico
SELECT h.*, u.name as performed_by_name
FROM equipment_history h
LEFT JOIN users u ON h.performedBy = u.id
WHERE h.equipmentId = ?
ORDER BY h.actionDate DESC;

-- Equipos próximos a vencer garantía
SELECT e.*, c.name as category_name
FROM equipment e
JOIN equipment_categories c ON e.categoryId = c.id
WHERE e.assignedDate IS NOT NULL
AND DATE_ADD(e.assignedDate, INTERVAL 12 MONTH) <= DATE_ADD(NOW(), INTERVAL 1 MONTH);

-- Resumen de inventario por categoría
SELECT c.name as category,
       COUNT(*) as total,
       SUM(CASE WHEN e.status = 'STOCK' THEN 1 ELSE 0 END) as stock,
       SUM(CASE WHEN e.status = 'ASSIGNED' THEN 1 ELSE 0 END) as assigned,
       SUM(CASE WHEN e.status = 'SOLD' THEN 1 ELSE 0 END) as sold
FROM equipment e
JOIN equipment_categories c ON e.categoryId = c.id
GROUP BY c.id, c.name
ORDER BY c.name;
```

## 🔧 Próximos Pasos - Implementación del Módulo de Equipos

### **Fase 1: Estructura Base**

1. **Crear estructura base** del proyecto NestJS
2. **Configurar TypeORM** con PostgreSQL
3. **Crear módulo de equipos** con estructura simple
4. **Implementar entidades básicas** (equipment_categories, equipment, equipment_history)

### **Fase 2: Entidades Principales**

5. **Implementar equipment** con campos específicos para ISP
6. **Implementar equipment_history** para auditoría
7. **Crear relaciones** entre entidades
8. **Agregar validaciones** de negocio básicas

### **Fase 3: API y Servicios**

9. **Implementar API REST** para equipos
10. **Crear servicios** de asignación y seguimiento
11. **Implementar búsquedas** por serial, MAC, cliente
12. **Agregar filtros** por estado, categoría, tipo de uso

### **Fase 4: Datos y Testing**

13. **Crear seeders** para categorías iniciales
14. **Implementar tests** unitarios básicos
15. **Crear datos de prueba** con equipos reales
16. **Validar funcionalidad** completa del módulo

### **Fase 5: Integración**

17. **Integrar con módulo de instalaciones**
18. **Integrar con módulo de empleados**
19. **Integrar con módulo de tickets**
20. **Crear reportes** básicos de inventario

### **Consideraciones Técnicas Simplificadas:**

#### **TypeORM Entities:**

```typescript
// Entidad principal simplificada
@Entity('equipment')
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  serialNumber: string;

  @Column({ nullable: true })
  macAddress: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  model: string;

  @Column({
    type: 'enum',
    enum: ['STOCK', 'ASSIGNED', 'SOLD', 'MAINTENANCE', 'LOST', 'USED'],
  })
  status: string;

  @Column({ type: 'date', nullable: true })
  assignedDate: Date;

  @Column({
    type: 'enum',
    enum: ['CLIENT', 'EMPLOYEE', 'COMPANY'],
  })
  useType: string;

  @Column({ nullable: true })
  assignedInstallationId: number;

  @Column({ nullable: true })
  assignedEmployeeId: number;

  @Column({ nullable: true })
  categoryId: number;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

#### **Validaciones de Negocio:**

```typescript
// Validaciones simples pero efectivas
@ValidateIf(o => o.status === 'ASSIGNED')
@IsNotEmpty()
assignedInstallationId: number;

@ValidateIf(o => o.status === 'SOLD')
@IsNotEmpty()
assignedInstallationId: number;

@IsOptional()
@IsEnum(['STOCK', 'ASSIGNED', 'SOLD', 'MAINTENANCE', 'LOST', 'USED'])
status: string;
```

#### **API Endpoints Simplificados:**

```
GET    /api/equipment              - Listar equipos
POST   /api/equipment              - Crear equipo
GET    /api/equipment/:id          - Obtener equipo
PUT    /api/equipment/:id          - Actualizar equipo
DELETE /api/equipment/:id          - Eliminar equipo

GET    /api/equipment/categories   - Listar categorías
POST   /api/equipment/categories   - Crear categoría

GET    /api/equipment/history/:id  - Historial de equipo
POST   /api/equipment/assign       - Asignar equipo
POST   /api/equipment/transfer     - Transferir equipo
POST   /api/equipment/maintenance  - Registrar mantenimiento

GET    /api/equipment/inventory    - Reporte de inventario
GET    /api/equipment/search       - Búsqueda avanzada
```

---

_Este análisis simplificado proporciona una base sólida y funcional para implementar un sistema de gestión de equipos para ISP, enfocado en simplicidad y efectividad._
