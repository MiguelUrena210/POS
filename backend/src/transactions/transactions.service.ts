import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Transaction,
  TransactionContents,
} from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly couponService: CouponsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(
      async (transactionEntityManager) => {
        // transactionEntityManager responde a las consultas sobre las entidades al momento de establecer transacciones sql
        const transaction = new Transaction();
        const total = createTransactionDto.contents.reduce(
          (total, item) => total + item.quantity * item.price,
          0,
        );
        transaction.total = total;

        if (createTransactionDto.coupon) {
          const coupon = await this.couponService.applyCoupon(
            createTransactionDto.coupon,
          );

          const discount = (coupon.percentage / 100) * total;
          transaction.discount = discount;
          transaction.coupon = coupon.name;
          transaction.total -= discount; 
        }
        
        await this.transactionRepository.save(transaction);

        for (const contents of createTransactionDto.contents) {
          const productFound = await transactionEntityManager.findOneBy(
            Product, // Al realizar consultas a entidades diferentes a la perteneciente al manejador, se especifica el nombre de la entidad correspondiente de la anterior manera
            {
              id: contents.productId,
            },
          );

          const errors: string[] = [];

          if (!productFound) {
            errors.push(
              `No se encontró un objeto con el id: ${contents.productId}`,
            );
            throw new NotFoundException(errors);
          }

          if (contents.quantity > productFound.inventory) {
            errors.push(
              `El articulo con ${productFound.name} excede la cantidad disponible en el inventario`,
            );
            throw new BadRequestException(errors);
          }

          productFound.inventory -= contents.quantity;

          // Crear instancia de transactionContents
          const transactionContents = new TransactionContents();
          transactionContents.price = contents.price;
          transactionContents.product = productFound;
          transactionContents.quantity = contents.quantity;
          transactionContents.transaction = transaction;

          await transactionEntityManager.save({ transactionContents });
        }

        return 'Venta almacenada correctamente';
      },
    );
  }

  // Todas las ventas
  findAll(transactionDate?: string) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true,
      },
    };

    if (transactionDate) {
      const date = parseISO(transactionDate);
      if (!isValid) {
        //funcion de date-fns que devuelve si la fecha transformada es válida o no
        throw new BadRequestException('Fecha no válida');
      }
      const start = startOfDay(date);
      const end = endOfDay(date);

      options.where = {
        transactionDate: Between(start, end),
      };
    }

    return this.transactionRepository.find(options);
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
      },
      relations: {
        contents: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`No se encontró transacción con el id ${id}`);
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  async remove(id: number) {
    // Ver si cambiarlo por un borrado lógico
    const transaction = await this.findOne(id);
    for (const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({
        id: contents.product.id,
      });
      if (product) {
        product.inventory += contents.quantity;
        await this.productRepository.save(product);
      }

      const transactionContents =
        await this.transactionContentsRepository.findOneBy({ id: contents.id });
      if (transactionContents) {
        await this.transactionContentsRepository.remove(transactionContents);
      }
    }
    await this.transactionRepository.remove(transaction);
    return { messsage: 'Venta eliminada' };
  }
}
