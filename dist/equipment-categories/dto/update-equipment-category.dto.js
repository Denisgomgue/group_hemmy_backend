"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEquipmentCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_equipment_category_dto_1 = require("./create-equipment-category.dto");
class UpdateEquipmentCategoryDto extends (0, mapped_types_1.PartialType)(create_equipment_category_dto_1.CreateEquipmentCategoryDto) {
}
exports.UpdateEquipmentCategoryDto = UpdateEquipmentCategoryDto;
//# sourceMappingURL=update-equipment-category.dto.js.map