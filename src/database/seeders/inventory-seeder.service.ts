import { Injectable } from '@nestjs/common';
import { EquipmentCategoriesService } from '../../equipment-categories/equipment-categories.service';
import { SEEDER_CONFIG } from './resource.seeder';

@Injectable()
export class InventorySeederService {
    constructor(
        private readonly equipmentCategoriesService: EquipmentCategoriesService,
    ) { }

    async seedCategories() {
        const categories = SEEDER_CONFIG.equipmentCategories;

        console.log('📦 Seeding categorías de equipamiento...');

        for (const categoryData of categories) {
            try {
                const existingCategory = await this.equipmentCategoriesService.findAll();
                const categoryExists = existingCategory.find(
                    (cat) => cat.code === categoryData.code,
                );

                if (!categoryExists) {
                    await this.equipmentCategoriesService.create(categoryData);
                    console.log(
                        `  ✅ Categoría creada: ${categoryData.code} - ${categoryData.name}`,
                    );
                } else {
                    console.log(
                        `  ⏭️  Categoría ya existe: ${categoryData.code} - ${categoryData.name}`,
                    );
                }
            } catch (error) {
                console.error(
                    `  ❌ Error creando categoría ${categoryData.name}:`,
                    error.message,
                );
            }
        }
    }
}

