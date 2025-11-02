# 🔔 Sistema de Notificaciones

## 📋 Resumen

Sistema de notificaciones diseñado para un ISP que permite a los usuarios recibir alertas sobre eventos importantes del sistema: clientes, instalaciones, suscripciones, pagos, tickets, usuarios y mantenimientos.

---

## 🏗️ Estructura de la Base de Datos

### Entidad: `Notification`

```typescript
@Entity()
export class Notification {
  id: number; // ID único
  type: NotificationType; // INFO, WARNING, SUCCESS, ERROR
  category: NotificationCategory; // Tipo de evento (ver categorías abajo)
  title: string; // Título de la notificación
  message: string; // Mensaje principal
  details?: string; // Detalles adicionales (opcional)
  isRead: boolean; // Si fue leída o no
  readAt?: Date; // Fecha de lectura
  actionUrl?: string; // URL de acción relacionada
  created_at: Date; // Fecha de creación
  updated_at: Date; // Fecha de actualización
  userId: number; // Usuario destinatario
  relatedEntityId?: number; // ID de la entidad relacionada
  relatedEntityType?: string; // Tipo de entidad relacionada
}
```

---

## 📊 Tipos de Notificaciones

### `NotificationType`

| Tipo      | Uso                 | Ejemplo                         |
| --------- | ------------------- | ------------------------------- |
| `INFO`    | Información general | "Se creó una nueva instalación" |
| `WARNING` | Advertencia         | "Pago vencido"                  |
| `SUCCESS` | Operación exitosa   | "Pago recibido correctamente"   |
| `ERROR`   | Error crítico       | "Error al procesar ticket"      |

---

## 📂 Categorías de Notificaciones

### **Clientes**

| Categoría               | Evento                                                |
| ----------------------- | ----------------------------------------------------- |
| `CLIENT_CREATED`        | Nuevo cliente registrado                              |
| `CLIENT_UPDATED`        | Información del cliente actualizada                   |
| `CLIENT_STATUS_CHANGED` | Estado del cliente cambió (ACTIVE/INACTIVE/SUSPENDED) |

### **Instalaciones**

| Categoría                     | Evento                                         |
| ----------------------------- | ---------------------------------------------- |
| `INSTALLATION_CREATED`        | Nueva instalación programada                   |
| `INSTALLATION_COMPLETED`      | Instalación completada                         |
| `INSTALLATION_STATUS_CHANGED` | Estado de instalación cambió (ACTIVE/INACTIVE) |

### **Suscripciones**

| Categoría                | Evento                   |
| ------------------------ | ------------------------ |
| `SUBSCRIPTION_CREATED`   | Nueva suscripción creada |
| `SUBSCRIPTION_ACTIVATED` | Suscripción activada     |
| `SUBSCRIPTION_SUSPENDED` | Suscripción suspendida   |
| `SUBSCRIPTION_CANCELLED` | Suscripción cancelada    |

### **Pagos**

| Categoría          | Evento            |
| ------------------ | ----------------- |
| `PAYMENT_CREATED`  | Nuevo pago creado |
| `PAYMENT_RECEIVED` | Pago recibido     |
| `PAYMENT_OVERDUE`  | Pago vencido      |
| `PAYMENT_REFUNDED` | Pago reembolsado  |

### **Tickets**

| Categoría         | Evento                     |
| ----------------- | -------------------------- |
| `TICKET_CREATED`  | Nuevo ticket creado        |
| `TICKET_ASSIGNED` | Ticket asignado a empleado |
| `TICKET_UPDATED`  | Ticket actualizado         |
| `TICKET_RESOLVED` | Ticket resuelto            |

### **Usuarios**

| Categoría          | Evento                 |
| ------------------ | ---------------------- |
| `USER_CREATED`     | Nuevo usuario creado   |
| `USER_DEACTIVATED` | Usuario desactivado    |
| `ROLE_ASSIGNED`    | Rol asignado a usuario |

### **Sistema**

| Categoría               | Evento                   |
| ----------------------- | ------------------------ |
| `SYSTEM_ALERT`          | Alerta del sistema       |
| `MAINTENANCE_SCHEDULED` | Mantenimiento programado |

---

## 🔌 Endpoints API

### Base: `/notification`

| Método   | Endpoint                 | Descripción                                  | Autenticación |
| -------- | ------------------------ | -------------------------------------------- | ------------- |
| `POST`   | `/notification`          | Crear notificación                           | Pública\*     |
| `GET`    | `/notification`          | Obtener todas las notificaciones del usuario | ✅ JWT        |
| `GET`    | `/notification/unread`   | Obtener no leídas                            | ✅ JWT        |
| `GET`    | `/notification/count`    | Contador de no leídas                        | ✅ JWT        |
| `GET`    | `/notification/:id`      | Obtener una notificación                     | ✅ JWT        |
| `PATCH`  | `/notification/:id/read` | Marcar como leída                            | ✅ JWT        |
| `PATCH`  | `/notification/read-all` | Marcar todas como leídas                     | ✅ JWT        |
| `PATCH`  | `/notification/:id`      | Actualizar notificación                      | ✅ JWT        |
| `DELETE` | `/notification/:id`      | Eliminar notificación                        | ✅ JWT        |

\*La creación es pública para permitir notificaciones por eventos del sistema, pero requiere `userId` en el body.

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Notificación de Pago Vencido

```typescript
POST /notification
{
  "type": "WARNING",
  "category": "PAYMENT_OVERDUE",
  "title": "Pago Vencido",
  "message": "El pago #123 está vencido hace 5 días",
  "details": "Cliente: Juan Pérez, Monto: $50.00",
  "actionUrl": "/clients/payment/123",
  "userId": 1,
  "relatedEntityId": 123,
  "relatedEntityType": "Payment"
}
```

### Ejemplo 2: Notificación de Ticket Asignado

```typescript
POST /notification
{
  "type": "INFO",
  "category": "TICKET_ASSIGNED",
  "title": "Nuevo Ticket Asignado",
  "message": "Se te ha asignado el ticket #456",
  "details": "Cliente: María López, Tipo: Técnico",
  "actionUrl": "/administration/tickets/456",
  "userId": 5,
  "relatedEntityId": 456,
  "relatedEntityType": "Ticket"
}
```

### Ejemplo 3: Notificación de Instalación Completada

```typescript
POST /notification
{
  "type": "SUCCESS",
  "category": "INSTALLATION_COMPLETED",
  "title": "Instalación Completada",
  "message": "La instalación #789 se ha completado exitosamente",
  "details": "Dirección: Av. Principal 123",
  "actionUrl": "/installations/list/789",
  "userId": 2,
  "relatedEntityId": 789,
  "relatedEntityType": "Installation"
}
```

---

## 🔧 Integración con Otros Módulos

### Ejemplo: Crear Notificación en PaymentService

```typescript
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class PaymentService {
  constructor(
    private paymentRepository: Repository<Payment>,
    private notificationService: NotificationService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const payment = await this.paymentRepository.save(createPaymentDto);

    // Notificar al creador
    await this.notificationService.create(
      {
        type: NotificationType.SUCCESS,
        category: NotificationCategory.PAYMENT_CREATED,
        title: 'Pago Creado',
        message: `Se creó el pago #${payment.id}`,
        actionUrl: `/clients/payment/${payment.id}`,
        relatedEntityId: payment.id,
        relatedEntityType: 'Payment',
      },
      createPaymentDto.createdByUserId,
    );

    return payment;
  }
}
```

---

## 📊 Casos de Uso Principales

### 1. **Notificaciones Automáticas por Eventos**

Cuando ocurre un evento importante (pago vencido, ticket asignado, etc.), el sistema automáticamente crea una notificación para el usuario correspondiente.

### 2. **Centro de Notificaciones en Frontend**

El frontend puede consultar las notificaciones no leídas y mostrar un badge con el contador.

### 3. **Alertas de Urgencia**

Notificaciones tipo `ERROR` o `WARNING` pueden aparecer como toast flotante inmediatamente.

### 4. **Historial de Actividades**

Las notificaciones pueden usarse para mostrar un historial de actividades del usuario.

---

## 🎯 Ventajas del Diseño

✅ **Simple y Funcional:** Estructura mínima sin complejidad innecesaria  
✅ **Flexible:** Soporta múltiples categorías y tipos  
✅ **Relacionado:** Permite vincular con entidades específicas  
✅ **Accionable:** URLs de acción permiten navegar directo al recurso  
✅ **Escalable:** Fácil agregar nuevas categorías  
✅ **Seguro:** Solo el usuario puede ver/editar sus notificaciones

---

## 🔄 Flujo de Trabajo

```
1. Evento ocurre (pago, ticket, etc.)
   ↓
2. Service crea notificación
   ↓
3. Notificación guardada en BD
   ↓
4. Frontend consulta /notification/unread
   ↓
5. Usuario ve badge con contador
   ↓
6. Usuario abre centro de notificaciones
   ↓
7. Usuario marca como leída o hace clic en actionUrl
   ↓
8. Notificación movida a "leídas"
```

---

## 📝 Checklist de Implementación

- [x] Entidad `Notification` creada
- [x] DTOs creados (`CreateNotificationDto`, `UpdateNotificationDto`)
- [x] Service con métodos CRUD
- [x] Controller con endpoints REST
- [x] Módulo de notificaciones
- [x] Integrado en `AppModule`
- [ ] Integrar en otros servicios (Payment, Ticket, etc.)
- [ ] Frontend: servicio de notificaciones
- [ ] Frontend: componente de centro de notificaciones
- [ ] Frontend: badge con contador
- [ ] WebSockets para notificaciones en tiempo real (futuro)

---

**Fecha de implementación:** Diciembre 2024  
**Estado:** ✅ Backend completo, pendiente integración
