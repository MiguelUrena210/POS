import { Product } from '../../products/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal')
  total: number;

  // Modificar la relación entre transacciones
  @Column({ type: 'varchar', length: 30, nullable: true })
  coupon: string;

  @Column({ type: 'decimal', nullable: true, default: 0 })
  discount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  transactionDate: Date;

  @OneToMany(() => TransactionContents, (contents) => contents.transaction)
  contents: TransactionContents[];
}

@Entity()
export class TransactionContents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  price: number; // Lo que ya pagó, no el precio actual del producto

  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
    cascade: true, // habilita acciones en cascada como la creacion
  })
  product: Product;

  @ManyToOne(() => Transaction, (transaction) => transaction.contents, {
    cascade: true, // habilita acciones en cascada como la creacion
  })
  transaction: Transaction;
}
