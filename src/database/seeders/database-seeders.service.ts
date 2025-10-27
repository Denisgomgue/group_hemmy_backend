import { Injectable } from '@nestjs/common';
import { InventorySeederService } from './inventory-seeder.service';
import { UserSeederService } from './user-seeder.service';

@Injectable()
export class DatabaseSeedersService {
    constructor(
        private readonly inventorySeederService: InventorySeederService,
        private readonly userSeederService: UserSeederService,
    ) { }

    async runAllSeeders() {
        console.log('🌱 Iniciando seeders de base de datos...');

        try {
            // Seed de categorías de equipamiento
            await this.inventorySeederService.seedCategories();

            // Seed de usuario administrador
            await this.userSeederService.seedAdminUser();

            console.log('✅ Seeders completados exitosamente!');
        } catch (error) {
            console.error('❌ Error ejecutando seeders:', error);
            throw error;
        }
    }
}

