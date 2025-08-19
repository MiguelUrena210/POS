import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Repository, DataSource } from 'typeorm';
export declare class SeederService {
    private readonly categoryRepository;
    private readonly productRepository;
    private dataSource;
    constructor(categoryRepository: Repository<Category>, productRepository: Repository<Product>, dataSource: DataSource);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
