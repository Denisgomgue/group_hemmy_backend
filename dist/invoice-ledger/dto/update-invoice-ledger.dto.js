"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvoiceLedgerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_invoice_ledger_dto_1 = require("./create-invoice-ledger.dto");
class UpdateInvoiceLedgerDto extends (0, mapped_types_1.PartialType)(create_invoice_ledger_dto_1.CreateInvoiceLedgerDto) {
}
exports.UpdateInvoiceLedgerDto = UpdateInvoiceLedgerDto;
//# sourceMappingURL=update-invoice-ledger.dto.js.map