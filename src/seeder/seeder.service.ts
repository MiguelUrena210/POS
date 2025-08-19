import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Repository, DataSource } from 'typeorm';
import { categories } from './data/categories';
import { products } from './data/products';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const conection = this.dataSource;
    await conection.dropDatabase();  // elimina la base de datos
    await conection.synchronize(); // considerando las entidades y las relaciones definidas, crea nuevamente la base de datos
  }
  async seed() {
    console.log('Desde seed en SeederService');
    await this.categoryRepository.save(categories);

    for await (const seedProduct of products) {
      const category = await this.categoryRepository.findOneBy({
        id: seedProduct.categoryId,
      });

      if (category) {
        const product = new Product();
        product.name = seedProduct.name;
        product.image = seedProduct.image;
        product.price = seedProduct.price;
        product.inventory = seedProduct.inventory;
        product.category = category;

        await this.productRepository.save(product)
      }
    }
  }
}
