import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CouponsService } from '../coupons/coupons.service';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly transactionContentsRepository;
    private readonly productRepository;
    private readonly couponService;
    constructor(transactionRepository: Repository<Transaction>, transactionContentsRepository: Repository<TransactionContents>, productRepository: Repository<Product>, couponService: CouponsService);
    create(createTransactionDto: CreateTransactionDto): Promise<void>;
    findAll(transactionDate?: string): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    update(id: number, updateTransactionDto: UpdateTransactionDto): string;
    remove(id: number): Promise<{
        messsage: string;
    }>;
}
