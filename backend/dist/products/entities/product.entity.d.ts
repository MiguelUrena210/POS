import { Category } from '../../categories/entities/category.entity';
export declare class Product {
    id: number;
    name: string;
    image: string;
    price: number;
    inventory: number;
    category: Category;
}
