# 📸 Sistema de Carga de Imágenes para Instalaciones

## 📋 Resumen

Sistema simple y directo para subir imágenes de referencia de instalaciones. La ruta de la imagen se guarda directamente en la columna `imagePath` de la tabla `installation`.

## 🏗️ Estructura

### Entidad Installation

```typescript
@Entity()
export class Installation {
  // ... otros campos

  @Column({ nullable: true })
  imagePath: string; // ← Nueva columna para la ruta de la imagen

  // ...
}
```

### Almacenamiento

- **Directorio:** `uploads/installations/`
- **URL pública:** `http://localhost:3000/uploads/installations/[nombre-archivo].jpg`
- **Formato:** Todas las imágenes se convierten a JPEG optimizado

## 🚀 Endpoints

### POST `/installation/:id/upload-image`

Sube una imagen para una instalación específica.

**Requisitos:**

- ✅ Usuario autenticado (JWT Guard)
- ✅ Campo `image` (multipart/form-data)
- ✅ Formatos permitidos: JPG, JPEG, PNG, GIF, WEBP
- ✅ Tamaño máximo: 10MB

**Ejemplo con cURL:**

```bash
curl -X POST http://localhost:3000/installation/1/upload-image \
  -H "Authorization: Bearer TU_TOKEN" \
  -F "image=@/path/to/imagen.jpg"
```

**Ejemplo con JavaScript (Fetch):**

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch(
  'http://localhost:3000/installation/1/upload-image',
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  },
);

const data = await response.json();
console.log(data);
// {
//   "id": 1,
//   "address": "...",
//   "imagePath": "/uploads/installations/1-1234567890-987654321.jpg",
//   ...
// }
```

## 📦 ¿Qué hace el sistema automáticamente?

1. **Optimización de imagen**
   - Redimensiona a máximo 1920x1080 (mantiene proporción)
   - Convierte a JPEG con calidad 85%
   - Reduce peso sin perder calidad visible

2. **Nombre único**
   - Formato: `{installationId}-{timestamp}-{random}.jpg`
   - Ejemplo: `1-1735216800000-987654321.jpg`

3. **Actualización automática**
   - Guarda la ruta completa en `imagePath` de la instalación
   - Retorna la instalación actualizada

## 📁 Obtener Imagen

Una vez subida, accede directamente a la URL:

```
http://localhost:3000/uploads/installations/1-1234567890-987654321.jpg
```

## 🔍 Consultar Instalación con Imagen

```bash
GET /installation/1

# Respuesta:
{
  "id": 1,
  "address": "Calle Principal 123",
  "ipAddress": "192.168.1.1",
  "imagePath": "/uploads/installations/1-1234567890-987654321.jpg",
  "status": "ACTIVE",
  "client": {...},
  "sector": {...}
}
```

## 🗑️ .gitignore

El directorio `uploads/` está en `.gitignore`, por lo que:

- ✅ No se sube al repositorio
- ✅ Se crea automáticamente al subir la primera imagen
- ⚠️ Recomendado hacer backup manual de las imágenes

## 🔒 Seguridad

- ✅ Solo usuarios autenticados pueden subir imágenes
- ✅ Validación de tipo de archivo
- ✅ Validación de tamaño
- ✅ Imágenes optimizadas (menos espacio)

## 📊 Estructura de Directorios

```
grupo_hemmy_backend/
├── src/
│   └── installation/
│       ├── installation.controller.ts  ← Endpoint upload agregado
│       ├── installation.service.ts
│       ├── installation.module.ts
│       └── entities/
│           └── installation.entity.ts   ← Campo imagePath agregado
├── uploads/                              ← Creado automáticamente
│   └── installations/
│       └── [archivos].jpg
├── .gitignore                            ← uploads/ agregado
└── main.ts                               ← Servir archivos estáticos
```

## 💡 Ventajas de este enfoque

✅ **Simple**: Solo una columna extra, sin tablas adicionales
✅ **Directo**: La imagen está vinculada a la instalación
✅ **Eficiente**: No necesitas un JOIN para obtener la imagen
✅ **Funcional**: Rápido de implementar y usar

## 🔄 Si necesitas múltiples imágenes

Si en el futuro necesitas múltiples imágenes por instalación:

1. Crear tabla `installation_images`
2. Relación `OneToMany` en Installation
3. Mover la lógica del upload a un servicio separado

Por ahora, esto es perfecto para el caso de uso de tener **una imagen de referencia** por instalación.
