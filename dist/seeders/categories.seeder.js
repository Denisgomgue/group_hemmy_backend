"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const equipment_categories_service_1 = require("../equipment-categories/equipment-categories.service");
const equipment_category_entity_1 = require("../equipment-categories/entities/equipment-category.entity");
async function seedCategories() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const categoriesService = app.get(equipment_categories_service_1.EquipmentCategoriesService);
    const categories = [
        {
            name: 'Router WiFi',
            description: 'Routers inalámbricos para clientes',
            color: '#3498db',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'ONT Fibra',
            description: 'Terminales ópticos de red',
            color: '#e74c3c',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'Decodificador',
            description: 'Decodificadores de TV/Internet',
            color: '#f39c12',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'Antena Cliente',
            description: 'Antenas para clientes inalámbricos',
            color: '#2ecc71',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'Radio Base',
            description: 'Equipos de radio para técnicos',
            color: '#9b59b6',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'Switch',
            description: 'Switches de red',
            color: '#34495e',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'UPS',
            description: 'Sistemas de respaldo',
            color: '#e67e22',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
        },
        {
            name: 'Cable',
            description: 'Cables de red y fibra',
            color: '#95a5a6',
            status: equipment_category_entity_1.CategoryStatus.ACTIVE
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
            }
            else {
                console.log(`⏭️  Categoría ya existe: ${categoryData.name}`);
            }
        }
        catch (error) {
            console.error(`❌ Error creando categoría ${categoryData.name}:`, error.message);
        }
    }
    console.log('🎉 Seeder completado!');
    await app.close();
}
seedCategories().catch(console.error);
//# sourceMappingURL=categories.seeder.js.map