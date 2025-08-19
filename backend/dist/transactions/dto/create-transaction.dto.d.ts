export declare class TransactionContentsDto {
    productId: number;
    quantity: number;
    price: number;
}
export declare class CreateTransactionDto {
    total: number;
    coupon: string;
    contents: TransactionContentsDto[];
}
