# Sistema de Autenticación - Grupo Hemmy

## 📋 Componentes Implementados

### 1. **JWT con Cookies HTTP-Only**

- ✅ Tokens JWT seguros almacenados en cookies HTTP-only
- ✅ Access token con expiración de 7 días
- ✅ Refresh token con expiración de 30 días
- ✅ Cookies seguras con `secure` y `sameSite: 'strict'`

### 2. **Módulos Creados**

- `src/auth/auth.module.ts` - Módulo principal de autenticación
- `src/auth/auth.service.ts` - Servicio con lógica de autenticación
- `src/auth/auth.controller.ts` - Endpoints de autenticación
- `src/auth/guards/` - Guards para protección de rutas
- `src/auth/strategies/` - Strategies de Passport (JWT y Local)

### 3. **Seguridad**

- ✅ Bcrypt para hash de contraseñas
- ✅ CORS configurado
- ✅ ValidationPipe global
- ✅ Guards para protección de rutas

### 4. **Endpoints Disponibles**

#### POST `/auth/login`

```json
{
  "email": "usuario@ejemplo.com",
  "password": "password123"
}
```

**Respuesta:**

```json
{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com",
    "actorId": 1
  }
}
```

**Cookies establecidas:**

- `access_token` (HTTP-only, 7 días)
- `refresh_token` (HTTP-only, 30 días)

#### POST `/auth/refresh`

- Renueva el access token usando refresh token
- Retorna nuevo `access_token` en cookie

#### POST `/auth/logout`

- Elimina cookies de sesión

#### POST `/auth/profile` (Protegido)

- Obtiene perfil del usuario autenticado

### 5. **Variables de Entorno**

Crear archivo `.env` en la raíz del proyecto:

```env
# JWT
JWT_SECRET=tu_secret_key_muy_segura_y_compleja_aqui
JWT_REFRESH_SECRET=refresh_secret_key_diferente
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:3001

# SERVER
PORT=3000
NODE_ENV=development
```

### 6. **Uso de Guards**

Para proteger rutas, usa el `JwtAuthGuard`:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('example')
export class ExampleController {
  @Get()
  @UseGuards(JwtAuthGuard)
  protectedRoute(@Request() req) {
    // req.user contiene los datos del usuario autenticado
    return req.user;
  }
}
```

### 7. **Estructura de JWT Payload**

```json
{
  "sub": 1, // ID del usuario
  "email": "usuario@ejemplo.com",
  "actorId": 1, // ID del actor asociado
  "iat": 1234567890,
  "exp": 1234567890
}
```

### 8. **Implementar Búsqueda por Email**

En `auth.service.ts`, línea 20-26, necesitas implementar la búsqueda real:

```typescript
async validateUser(email: string, password: string): Promise<any> {
  // Buscar usuario por email en person
  const user = await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.actor', 'actor')
    .leftJoinAndSelect('actor.person', 'person')
    .where('person.email = :email', { email })
    .andWhere('user.isActive = :isActive', { isActive: true })
    .getOne();

  if (!user) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new UnauthorizedException('Credenciales inválidas');
  }

  return { ...user, passwordHash: undefined };
}
```

### 9. **Testing**

```bash
# Iniciar servidor
npm run start:dev

# Probar login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"password123"}'

# Probar endpoint protegido
curl -X POST http://localhost:3000/auth/profile \
  -H "Cookie: access_token=TU_TOKEN_AQUI"
```

### 10. **Próximos Pasos**

- ✅ Sistema de refresh token
- ✅ Cookies seguras HTTP-only
- ✅ Guards de autenticación
- ⏳ Cache de sesiones (implementar Redis si es necesario)
- ⏳ Rate limiting para prevenir ataques
- ⏳ 2FA (autenticación de dos factores)
- ⏳ Logs de auditoría de autenticación
