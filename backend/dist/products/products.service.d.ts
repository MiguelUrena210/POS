import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
export declare class ProductsService {
    private readonly productRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, categoryRepository: Repository<Category>);
    create(createProductDto: CreateProductDto): Promise<{
        category: Category;
        name: string;
        price: number;
        inventory: number;
        categoryId: number;
    } & Product>;
    findAll(take: number, skip: number, categoryId?: number): Promise<{
        products: Product[];
        total: number;
    }>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<string>;
}
