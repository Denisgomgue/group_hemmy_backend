# Cómo Funciona la Autenticación - Backend

## 🔐 Sistema de Autenticación: **COOKIES HTTP-ONLY** (NO Bearer Token)

Este backend **NO usa Bearer Token en headers**. Usa **cookies HTTP-only** para mayor seguridad.

### Flujo de Autenticación

#### 1. **Login** (`POST /auth/login`)

```
Frontend envía:
{
  "email": "admin@hemmy.com",
  "password": "admin123"
}

Backend responde:
{
  "message": "Inicio de sesión exitoso",
  "user": { ... }
}

Y automáticamente establece cookies:
- access_token (7 días)
- refresh_token (30 días)
```

#### 2. **Cookies HTTP-Only**

Las cookies se envían **automáticamente** en cada petición:

```
POST /auth/profile
Cookie: access_token=eyJhbGc...
```

**NO necesitas agregar:**

```http
Authorization: Bearer eyJhbGc...
```

#### 3. **Estrategia JWT**

El backend lee el token de la cookie automáticamente:

```typescript:17:24:grupo_hemmy_backend/src/auth/strategies/jwt.strategy.ts
super({
    jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
            return request?.cookies?.access_token;
        },
    ]),
    secretOrKey: configService.get<string>('JWT_SECRET'),
});
```

#### 4. **Validación Automática**

Cuando haces una petición protegida:

```typescript
@UseGuards(JwtAuthGuard)  // ← Lee la cookie automáticamente
@Post('profile')
async getProfile(@Request() req) {
    return req.user;  // ← Usuario ya validado
}
```

## 📝 Configuración del .env

### Backend (grupo_hemmy_backend/.env)

```env
# MYSQL - SIN valores por defecto
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=  # ← VACÍO (sin comentar, sin nada)
DB_NAME=grupo_hemmy

# JWT
JWT_SECRET=tu_secret_key_muy_segura_aqui
JWT_REFRESH_SECRET=refresh_secret_key

# Servidor
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

**IMPORTANTE:**

- Si tu MySQL NO tiene contraseña en root: `DB_PASSWORD=` (vacío)
- Si tiene contraseña: `DB_PASSWORD=tupassword`
- NO dejes espacios: `DB_PASSWORD= ` es diferente de `DB_PASSWORD=`

## 🔧 Por Qué No Hay Bearer Token

### Ventajas de Cookies HTTP-Only:

1. **Más Seguro**: JavaScript no puede acceder a las cookies
2. **Automático**: No necesitas agregar headers manualmente
3. **CSRF Protection**: Se usa `sameSite: 'strict'`
4. **Más Simple**: El navegador maneja todo

### El flujo es:

```typescript
// 1. Login
POST /auth/login → Backend establece cookies → Frontend recibe success

// 2. Peticiones protegidas
GET /auth/profile → Cookie enviada automáticamente → Backend valida

// 3. Logout
POST /auth/logout → Backend borra cookies
```

## ⚠️ Sin Credenciales por Defecto

Todos los valores se leen **SOLO** del `.env`:

```typescript:44:54:grupo_hemmy_backend/src/app.module.ts
TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,  // ← Solo del .env
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,  // ← Solo del .env
    password: process.env.DB_PASSWORD || '',  // ← Solo del .env
    database: process.env.DB_NAME,  // ← Solo del .env
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    timezone: 'Z',
}),
```

## 🔄 Comparación: Cookies vs Bearer Token

### Con Cookies (ESTE PROYECTO):

```typescript
// Login
const res = await axios.post('/auth/login', { email, password });
// ✅ Cookies establecidas automáticamente

// Usar API
const res = await axios.get('/auth/profile');
// ✅ Cookies enviadas automáticamente
```

### Con Bearer Token:

```typescript
// Login
const res = await axios.post('/auth/login', { email, password });
const token = res.data.token;

// Usar API
const res = await axios.get('/auth/profile', {
  headers: { Authorization: `Bearer ${token}` },
});
```

## 🎯 Resumen

1. **Login**: Frontend envía email/password, backend responde con cookies
2. **Autenticación**: Axios envía cookies automáticamente en cada request
3. **No Bearer Token**: No se usan headers de Authorization
4. **Seguro**: Cookies HTTP-only no son accesibles vía JavaScript
5. **Configuración**: Todo en `.env`, sin valores por defecto
