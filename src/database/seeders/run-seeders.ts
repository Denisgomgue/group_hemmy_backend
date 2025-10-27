import { INestApplication } from '@nestjs/common';
import { InventorySeederService } from './inventory-seeder.service';
import { UserSeederService } from './user-seeder.service';

/**
 * Ejecuta los seeders usando el contexto de la aplicación principal.
 * NO crea un ApplicationContext separado para evitar problemas con DataSource.
 */
export async function runSeeders(app: INestApplication) {
    // Obtener servicios de seeders desde el contexto principal
    const inventorySeeder = app.get(InventorySeederService);
    const userSeeder = app.get(UserSeederService);

    try {
        console.log('🌱 Iniciando seeders de base de datos...');

        // Ejecutar seeders
        await inventorySeeder.seedCategories();
        await userSeeder.seedAdminUser();

        console.log('✅ Seeders completados exitosamente!');
    } catch (error) {
        console.error('❌ Error ejecutando seeders:', error);
        throw error;
    }
    // NO cerramos la app aquí - la app principal la cerrará
}

