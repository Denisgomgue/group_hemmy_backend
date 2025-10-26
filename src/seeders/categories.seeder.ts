import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EquipmentCategoriesService } from '../equipment-categories/equipment-categories.service';
import { CategoryStatus } from '../equipment-categories/entities/equipment-category.entity';

async function seedCategories() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const categoriesService = app.get(EquipmentCategoriesService);

    const categories = [
        {
            name: 'Router WiFi',
            description: 'Routers inalámbricos para clientes',
            color: '#3498db',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'ONT Fibra',
            description: 'Terminales ópticos de red',
            color: '#e74c3c',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'Decodificador',
            description: 'Decodificadores de TV/Internet',
            color: '#f39c12',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'Antena Cliente',
            description: 'Antenas para clientes inalámbricos',
            color: '#2ecc71',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'Radio Base',
            description: 'Equipos de radio para técnicos',
            color: '#9b59b6',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'Switch',
            description: 'Switches de red',
            color: '#34495e',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'UPS',
            description: 'Sistemas de respaldo',
            color: '#e67e22',
            status: CategoryStatus.ACTIVE
        },
        {
            name: 'Cable',
            description: 'Cables de red y fibra',
            color: '#95a5a6',
            status: CategoryStatus.ACTIVE
        }
    ];

    console.log('🌱 Iniciando seeder de categorías...');

    for (const categoryData of categories) {
        try {
            const existingCategory = await categoriesService.findAll();
            const categoryExists = existingCategory.find(cat => cat.name === categoryData.name);

            if (!categoryExists) {
                await categoriesService.create(categoryData);
                console.log(`✅ Categoría creada: ${categoryData.name}`);
            } else {
                console.log(`⏭️  Categoría ya existe: ${categoryData.name}`);
            }
        } catch (error) {
            console.error(`❌ Error creando categoría ${categoryData.name}:`, error.message);
        }
    }

    console.log('🎉 Seeder completado!');
    await app.close();
}

// Ejecutar seeder
seedCategories().catch(console.error);
