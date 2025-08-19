import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({
      id: createProductDto.categoryId,
    });

    if (!category) {
      throw new NotFoundException('La categoría no existe');
    }

    return this.productRepository.save({
      ...createProductDto,
      category,
    });
  }

  async findAll(take: number, skip: number, categoryId?: number) {
    // Devuelve todos
    /* return this.productRepository.find({
      // Devuelve todos y los cuenta
      relations: {
        category: true,
      }, //, loadEagerRelations: false // Habilita o deshabilita el que recupere los datos relacionados
      order: {
        id: 'ASC', //ordena conforme a una columna ya sea de manera ascendente o descendente
      },
    }); */

    // Los cuenta y devuelve el total
    /* const [data, total] = await this.productRepository.findAndCount({
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
    });

    return { data, total }; */

    //Version que puede o no contener un tipo de categoría
    const options: FindManyOptions<Product> = {
      relations: {
        category: true,
      },
      order: {
        id: 'DESC',
      },
      take, // Cuantos se mostraran por paginacion
      //take: 2, // La cantidad de resultados que tomará
      skip, // Cuantos resultados se saltaran paraempezar a recuperar resultados
    };

    if (categoryId) {
      options.where = {
        category: {
          id: categoryId,
        },
      };
    }

    const [products, total] =
      await this.productRepository.findAndCount(options);

    return { products, total };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `El producto con el id: ${id} no fue encontrado`,
      );
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: updateProductDto.categoryId,
      });

      if (!category) {
        throw new NotFoundException('La categoría no existe');
      }

      product.category = category;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id)
		await this.productRepository.remove(product)
		return 'Producto eliminado'
  }
}
