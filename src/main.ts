import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Ejecutar seeders automáticamente en desarrollo
  // Usamos el contexto de la app principal, NO creamos uno nuevo
  if (process.env.NODE_ENV !== 'production') {
    try {
      console.log('🔄 Verificando seeders de base de datos...');
      const { runSeeders } = await import('./database/seeders/run-seeders');
      await runSeeders(app); // Pasar app, NO cerrar DataSource
    } catch (error) {
      console.error('⚠️  Error ejecutando seeders (continuando):', error);
    }
  }

  // Habilitar CORS con configuración segura
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001',
    credentials: true,
    methods: [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ],
    allowedHeaders: [ 'Content-Type', 'Authorization' ],
  });

  // Configurar cookie parser para cookies HTTP-only
  app.use(cookieParser());

  // Servir archivos estáticos (imágenes)
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT ?? 3000}`);
}
bootstrap();
