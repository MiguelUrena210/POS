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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("../categories/entities/category.entity");
const product_entity_1 = require("../products/entities/product.entity");
const typeorm_2 = require("typeorm");
const categories_1 = require("./data/categories");
const products_1 = require("./data/products");
let SeederService = class SeederService {
    categoryRepository;
    productRepository;
    dataSource;
    constructor(categoryRepository, productRepository, dataSource) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.dataSource = dataSource;
    }
    async onModuleInit() {
        const conection = this.dataSource;
        await conection.dropDatabase();
        await conection.synchronize();
    }
    async seed() {
        console.log('Desde seed en SeederService');
        await this.categoryRepository.save(categories_1.categories);
        for await (const seedProduct of products_1.products) {
            const category = await this.categoryRepository.findOneBy({
                id: seedProduct.categoryId,
            });
            if (category) {
                const product = new product_entity_1.Product();
                product.name = seedProduct.name;
                product.image = seedProduct.image;
                product.price = seedProduct.price;
                product.inventory = seedProduct.inventory;
                product.category = category;
                await this.productRepository.save(product);
            }
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], SeederService);
//# sourceMappingURL=seeder.service.js.map