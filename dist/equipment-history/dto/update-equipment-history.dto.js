"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEquipmentHistoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_equipment_history_dto_1 = require("./create-equipment-history.dto");
class UpdateEquipmentHistoryDto extends (0, mapped_types_1.PartialType)(create_equipment_history_dto_1.CreateEquipmentHistoryDto) {
}
exports.UpdateEquipmentHistoryDto = UpdateEquipmentHistoryDto;
//# sourceMappingURL=update-equipment-history.dto.js.map