"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceItemDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_invoice_item_dto_1 = require("./create-invoice-item.dto");
class UpdateInvoiceItemDto extends (0, mapped_types_1.PartialType)(create_invoice_item_dto_1.CreateInvoiceItemDto) {
}
exports.UpdateInvoiceItemDto = UpdateInvoiceItemDto;
//# sourceMappingURL=update-invoice-item.dto.js.map