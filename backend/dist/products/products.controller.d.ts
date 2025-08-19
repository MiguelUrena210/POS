import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<{
        category: import("../categories/entities/category.entity").Category;
        name: string;
        price: number;
        inventory: number;
        categoryId: number;
    } & import("./entities/product.entity").Product>;
    findAll(query: GetProductsQueryDto): Promise<{
        products: import("./entities/product.entity").Product[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<string>;
}
