# 🔔 Cómo Funciona el Sistema de Notificaciones

## 📋 Resumen Ejecutivo

El sistema de notificaciones es un **centro de alertas personalizadas** donde cada usuario recibe avisos sobre eventos importantes que le conciernen: pagos vencidos, tickets asignados, instalaciones completadas, etc.

---

## 🎯 ¿Para Qué Sirve?

### Problema que Resuelve

En un ISP, los empleados necesitan estar al tanto de eventos críticos:

- **Secretarias:** Pagos vencidos, nuevos clientes
- **Técnicos:** Tickets asignados, instalaciones programadas
- **Administradores:** Alertas del sistema, usuarios desactivados
- **Superadmins:** Eventos críticos del sistema

### Solución

Un sistema **centralizado** donde:

1. Cada evento importante crea una notificación automáticamente
2. Cada usuario ve solo SUS notificaciones
3. El frontend muestra un badge con el contador de no leídas
4. El usuario puede marcar como leída o hacer clic para ir al recurso

---

## 🏗️ Arquitectura del Sistema

### 1. **Base de Datos**

```sql
notification
├── id (PK)
├── type (INFO, WARNING, SUCCESS, ERROR)
├── category (CLIENT_CREATED, PAYMENT_OVERDUE, etc.)
├── title (título)
├── message (mensaje)
├── details (detalles opcionales)
├── isRead (leída o no)
├── readAt (cuándo se leyó)
├── actionUrl (URL para ir al recurso)
├── userId (FK → user)
├── relatedEntityId (ID del recurso relacionado)
└── relatedEntityType (tipo de recurso: Payment, Ticket, etc.)
```

### 2. **Flujo de Datos**

```
┌─────────────────┐
│   Evento        │ (Pago vencido, Ticket asignado, etc.)
│   en Sistema    │
└────────┬────────┘
         │
         ↓
┌─────────────────────────────┐
│   Service detecta evento    │ (PaymentService, TicketService, etc.)
│   → Llama a NotificationService.create()
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│   NotificationService       │
│   → Guarda en BD            │
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│   Base de Datos             │
│   → Notification creada     │
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│   Frontend consulta         │
│   GET /notification/unread  │
└────────┬────────────────────┘
         │
         ↓
┌─────────────────────────────┐
│   Usuario ve badge          │
│   y notificación            │
└─────────────────────────────┘
```

---

## 🔄 Ciclo de Vida de una Notificación

### Etapa 1: Creación Automática

**Ejemplo:** Un pago vence

```typescript
// PaymentService detecta pago vencido
async checkOverduePayments() {
    const overduePayments = await this.findOverdue();

    for (const payment of overduePayments) {
        // Crear notificación automáticamente
        await this.notificationService.create({
            type: NotificationType.WARNING,
            category: NotificationCategory.PAYMENT_OVERDUE,
            title: 'Pago Vencido',
            message: `El pago #${payment.id} está vencido`,
            details: `Cliente: ${payment.client.name}, Monto: $${payment.amount}`,
            actionUrl: `/clients/payment/${payment.id}`,
            relatedEntityId: payment.id,
            relatedEntityType: 'Payment'
        }, payment.createdByUserId);
    }
}
```

**Resultado:** Se guarda en BD:

```json
{
  "id": 1,
  "type": "WARNING",
  "category": "PAYMENT_OVERDUE",
  "title": "Pago Vencido",
  "message": "El pago #123 está vencido",
  "details": "Cliente: Juan Pérez, Monto: $50.00",
  "isRead": false,
  "actionUrl": "/clients/payment/123",
  "userId": 5,
  "relatedEntityId": 123,
  "relatedEntityType": "Payment"
}
```

### Etapa 2: Consulta desde Frontend

**Frontend hace polling cada 30 segundos:**

```typescript
// Frontend: services/notification.service.ts
async getUnreadNotifications() {
    return await api.get('/notification/unread');
}

async getUnreadCount() {
    const response = await api.get('/notification/count');
    return response.data;
}
```

**Backend responde:**

```typescript
// NotificationService
async findUnread(userId: number) {
    return this.notificationRepository.find({
        where: { userId, isRead: false },
        order: { created_at: 'DESC' }
    });
}
```

### Etapa 3: Visualización

El frontend muestra:

```
🔔 3  [Badge con contador]

┌─────────────────────────────────────────┐
│ ⚠️ Pago Vencido                         │
│   El pago #123 está vencido             │
│   Cliente: Juan Pérez, Monto: $50.00    │
│   [Ver Detalle]                         │
├─────────────────────────────────────────┤
│ ✅ Instalación Completada               │
│   La instalación #789 se completó       │
│   [Ver Instalación]                     │
└─────────────────────────────────────────┘
```

### Etapa 4: Usuario Interactúa

**Opción A:** Marca como leída

```typescript
// Frontend
await api.patch('/notification/123/read');

// Backend
async markAsRead(id: number, userId: number) {
    const notification = await this.findOne(id, userId);
    notification.isRead = true;
    notification.readAt = new Date();
    return this.notificationRepository.save(notification);
}
```

**Opción B:** Hace clic en "Ver Detalle"

```typescript
// Frontend navega a actionUrl
router.push('/clients/payment/123');
```

---

## 💡 Casos de Uso Reales

### Caso 1: Técnico Recibe Ticket Asignado

**Flujo:**

1. Secretaria crea ticket para instalación
2. Asigna ticket a técnico "Juan"
3. Se crea notificación automática

```typescript
// TicketService
async assignTicket(ticketId: number, employeeId: number) {
    const ticket = await this.findOne(ticketId);
    ticket.employeeId = employeeId;
    await this.save(ticket);

    // Notificar al técnico
    await this.notificationService.create({
        type: NotificationType.INFO,
        category: NotificationCategory.TICKET_ASSIGNED,
        title: 'Nuevo Ticket Asignado',
        message: `Se te asignó el ticket #${ticket.id}`,
        details: `Cliente: ${ticket.client.name}, Prioridad: ${ticket.priority}`,
        actionUrl: `/administration/tickets/${ticket.id}`,
        relatedEntityId: ticket.id,
        relatedEntityType: 'Ticket'
    }, employeeId);
}
```

**Resultado:**

- Técnico ve badge "🔔 1"
- Abre notificaciones y ve: "Nuevo Ticket Asignado - Ticket #456"
- Hace clic y va directo al ticket

---

### Caso 2: Pagos Vencidos (Automático)

**Flujo:**

1. Cada día a las 8 AM corre un cronjob
2. Busca pagos vencidos
3. Crea notificación para cada uno

```typescript
// En un cronjob o servicio programado
@Cron('0 8 * * *') // 8 AM todos los días
async checkOverduePayments() {
    const payments = await this.paymentService.findOverdue();

    for (const payment of payments) {
        // Notificar al creador
        await this.notificationService.create({
            type: NotificationType.WARNING,
            category: NotificationCategory.PAYMENT_OVERDUE,
            title: 'Pago Vencido',
            message: `El pago #${payment.id} lleva ${payment.daysOverdue} días vencido`,
            actionUrl: `/clients/payment/${payment.id}`,
            relatedEntityId: payment.id,
            relatedEntityType: 'Payment'
        }, payment.createdByUserId);
    }
}
```

**Resultado:**

- Secretaria ve 5 notificaciones de pagos vencidos
- Badge muestra "🔔 5"
- Puede ver todos y marcarlos como leídos

---

### Caso 3: Instalación Completada

**Flujo:**

1. Técnico completa instalación
2. Cambia status a "COMPLETED"
3. Notificación se crea automáticamente

```typescript
// InstallationService
async updateStatus(id: number, status: InstallationStatus) {
    const installation = await this.findOne(id);
    installation.status = status;
    await this.save(installation);

    if (status === InstallationStatus.ACTIVE) {
        // Notificar a administrador
        await this.notificationService.create({
            type: NotificationType.SUCCESS,
            category: NotificationCategory.INSTALLATION_COMPLETED,
            title: 'Instalación Completada',
            message: `La instalación #${installation.id} se completó exitosamente`,
            details: `Cliente: ${installation.client.name}, Dirección: ${installation.address}`,
            actionUrl: `/installations/list/${installation.id}`,
            relatedEntityId: installation.id,
            relatedEntityType: 'Installation'
        }, installation.createdByUserId);
    }
}
```

---

## 🔌 API Completa

### Endpoints Disponibles

| Endpoint                 | Método | Descripción                          | Ejemplo                |
| ------------------------ | ------ | ------------------------------------ | ---------------------- |
| `/notification`          | GET    | Todas las notificaciones del usuario | Ver historial completo |
| `/notification/unread`   | GET    | Solo no leídas                       | Badge + dropdown       |
| `/notification/count`    | GET    | Cantidad de no leídas                | Badge: "🔔 5"          |
| `/notification/:id`      | GET    | Una notificación específica          | Ver detalles           |
| `/notification`          | POST   | Crear notificación\*                 | Desde otros servicios  |
| `/notification/:id/read` | PATCH  | Marcar como leída                    | Al hacer clic          |
| `/notification/read-all` | PATCH  | Marcar todas como leídas             | "Marcar todas"         |
| `/notification/:id`      | DELETE | Eliminar notificación                | Limpiar                |

\*La creación normalmente se hace desde otros servicios, no desde el frontend.

---

## 🎨 Tipos y Categorías

### Tipos (`NotificationType`)

| Tipo      | Color    | Uso                  |
| --------- | -------- | -------------------- |
| `INFO`    | Azul     | Información general  |
| `WARNING` | Amarillo | Advertencias         |
| `SUCCESS` | Verde    | Operaciones exitosas |
| `ERROR`   | Rojo     | Errores críticos     |

### Categorías (`NotificationCategory`)

**Cliente:** `CLIENT_CREATED`, `CLIENT_UPDATED`, `CLIENT_STATUS_CHANGED`  
**Instalación:** `INSTALLATION_CREATED`, `INSTALLATION_COMPLETED`, `INSTALLATION_STATUS_CHANGED`  
**Suscripción:** `SUBSCRIPTION_CREATED`, `SUBSCRIPTION_ACTIVATED`, `SUBSCRIPTION_SUSPENDED`, `SUBSCRIPTION_CANCELLED`  
**Pago:** `PAYMENT_CREATED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`  
**Ticket:** `TICKET_CREATED`, `TICKET_ASSIGNED`, `TICKET_UPDATED`, `TICKET_RESOLVED`  
**Usuario:** `USER_CREATED`, `USER_DEACTIVATED`, `ROLE_ASSIGNED`  
**Sistema:** `SYSTEM_ALERT`, `MAINTENANCE_SCHEDULED`

---

## 🔐 Seguridad

### ✅ Protecciones Implementadas

1. **Aislamiento por Usuario:** Solo puedes ver TUS notificaciones

   ```typescript
   async findAll(userId: number) {
       return this.notificationRepository.find({
           where: { userId } // Solo las tuyas
       });
   }
   ```

2. **Autenticación JWT:** Todos los endpoints requieren login

   ```typescript
   @UseGuards(JwtAuthGuard)
   export class NotificationController {}
   ```

3. **Validación de Propiedad:** No puedes marcar como leída las de otro
   ```typescript
   async markAsRead(id: number, userId: number) {
       // Busca por ID + userId
       const notification = await this.findOne(id, userId);
   }
   ```

---

## 📊 Beneficios del Diseño

### ✅ Simple y Funcional

- Estructura mínima sin complejidad innecesaria
- No necesita múltiples tablas de configuración
- Fácil de entender y mantener

### ✅ Flexible

- Fácil agregar nuevas categorías
- Soporta cualquier tipo de evento
- Campos opcionales para extensibilidad

### ✅ Escalable

- Performance optimizado (índices en `userId`, `isRead`)
- Paginación posible en el futuro
- WebSockets fáciles de agregar

### ✅ Accionable

- `actionUrl` permite navegar directo al recurso
- `relatedEntityId` y `relatedEntityType` para contexto
- Usuario va directo a donde necesita actuar

---

## 🚀 Próximos Pasos (Futuro)

### 1. WebSockets para Tiempo Real

```typescript
// Cuando se crea notificación
@WebSocketGateway()
export class NotificationGateway {
  // Emitir a usuario específico
  emitNotification(userId: number, notification: Notification) {
    this.server.to(`user-${userId}`).emit('new-notification', notification);
  }
}
```

### 2. Notificaciones Push (Mobile)

- Integrar Firebase Cloud Messaging
- Enviar notificaciones a dispositivos móviles

### 3. Filtros y Búsqueda

```typescript
GET /notification?type=WARNING&category=PAYMENT_OVERDUE
```

### 4. Notificaciones por Roles

- Notificaciones específicas según el rol
- Ejemplo: Solo TECNICOS ven tickets asignados

---

## 📝 Resumen

El sistema de notificaciones funciona así:

1. **Evento ocurre** → (pago, ticket, instalación)
2. **Service detecta** → Llama a `NotificationService.create()`
3. **BD guarda** → Notificación creada
4. **Frontend consulta** → `GET /notification/unread`
5. **Usuario ve** → Badge + lista de no leídas
6. **Usuario actúa** → Marca como leída o hace clic en `actionUrl`
7. **Estado actualiza** → `isRead = true`, `readAt = ahora`

**En una palabra:** Es un **centro de alertas personalizadas** que informa a cada usuario sobre eventos importantes en el sistema.

---

**¿Necesitas más detalles sobre algún aspecto específico?**
