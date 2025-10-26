"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInstallationDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_installation_dto_1 = require("./create-installation.dto");
class UpdateInstallationDto extends (0, mapped_types_1.PartialType)(create_installation_dto_1.CreateInstallationDto) {
}
exports.UpdateInstallationDto = UpdateInstallationDto;
//# sourceMappingURL=update-installation.dto.js.map