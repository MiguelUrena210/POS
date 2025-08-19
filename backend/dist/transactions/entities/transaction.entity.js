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
exports.TransactionContents = exports.Transaction = void 0;
const product_entity_1 = require("../../products/entities/product.entity");
const typeorm_1 = require("typeorm");
let Transaction = class Transaction {
    id;
    total;
    coupon;
    discount;
    transactionDate;
    contents;
};
exports.Transaction = Transaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Transaction.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, nullable: true }),
    __metadata("design:type", String)
], Transaction.prototype, "coupon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Transaction.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' }),
    __metadata("design:type", Date)
], Transaction.prototype, "transactionDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TransactionContents, (contents) => contents.transaction),
    __metadata("design:type", Array)
], Transaction.prototype, "contents", void 0);
exports.Transaction = Transaction = __decorate([
    (0, typeorm_1.Entity)()
], Transaction);
let TransactionContents = class TransactionContents {
    id;
    quantity;
    price;
    product;
    transaction;
};
exports.TransactionContents = TransactionContents;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TransactionContents.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], TransactionContents.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], TransactionContents.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.id, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", product_entity_1.Product)
], TransactionContents.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Transaction, (transaction) => transaction.contents, {
        cascade: true,
    }),
    __metadata("design:type", Transaction)
], TransactionContents.prototype, "transaction", void 0);
exports.TransactionContents = TransactionContents = __decorate([
    (0, typeorm_1.Entity)()
], TransactionContents);
//# sourceMappingURL=transaction.entity.js.map