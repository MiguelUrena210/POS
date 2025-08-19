"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionDto = exports.TransactionContentsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class TransactionContentsDto {
    productId;
    quantity;
    price;
}
exports.TransactionContentsDto = TransactionContentsDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del producto no puede estar vacío' }),
    (0, class_validator_1.IsInt)({ message: 'Producto no válido' }),
    __metadata("design:type", Number)
], TransactionContentsDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Cantidad no puede estar vacía' }),
    (0, class_validator_1.IsInt)({ message: 'Cantidad no válida' }),
    __metadata("design:type", Number)
], TransactionContentsDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Precio no puede estar vacío' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Precio no válido' }),
    __metadata("design:type", Number)
], TransactionContentsDto.prototype, "price", void 0);
class CreateTransactionDto {
    total;
    coupon;
    contents;
}
exports.CreateTransactionDto = CreateTransactionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El Total no puede ir vacio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Cantidad no válida' }),
    __metadata("design:type", Number)
], CreateTransactionDto.prototype, "total", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTransactionDto.prototype, "coupon", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Los Contenidos no pueden ir vacios' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TransactionContentsDto),
    __metadata("design:type", Array)
], CreateTransactionDto.prototype, "contents", void 0);
//# sourceMappingURL=create-transaction.dto.js.map