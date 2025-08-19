import { Product } from '../../products/entities/product.entity';
export declare class Transaction {
    id: number;
    total: number;
    coupon: string;
    discount: number;
    transactionDate: Date;
    contents: TransactionContents[];
}
export declare class TransactionContents {
    id: number;
    quantity: number;
    price: number;
    product: Product;
    transaction: Transaction;
}
