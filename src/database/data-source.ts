import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * DataSource de TypeORM para migraciones y seeders
 * 
 * Este archivo no se usa actualmente con NestJS pero es útil para:
 * - Ejecutar migraciones con TypeORM CLI
 * - Generar migraciones automáticamente
 * - Ejecutar seeders desde línea de comandos
 * 
 * En el futuro, si quieres usar migraciones de TypeORM:
 * 1. Actualiza esta configuración con las rutas correctas
 * 2. Configura ormconfig.json
 * 3. Usa: npm run typeorm migration:run
 */
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME!,
    entities: [ 'dist/**/*.entity.js' ],
    migrations: [ 'dist/database/migrations/*.js' ],
    synchronize: false,
    logging: true,
});

export default AppDataSource;

