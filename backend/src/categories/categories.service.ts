import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    /* Primera manera (Abierto a comprobaciones) */
    /* const category = new Category();
    category.name = createCategoryDto.name;
    return this.categoryRepository.save(category); */

    /* Segunda manera (Directo)*/
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find(); // Encontrar todos
    /* return this.categoryRepository.findBy({id: 2}); */ // Retornar las coincidencias
  }

  async findOne(id: number, products?: string) {
    const options: FindManyOptions<Category> = {
      where: {
        id,
      },
    };

    if (products === 'true') {
      options.relations = {
        products: true,
      };
    }

    const category = await this.categoryRepository.findOne(options);
    if (!category) {
      throw new NotFoundException('La categoría no existe'); // Errores prefabricados de Nestjs
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id); //Refiere al método dentro de la clase CategoriesService
    category.name = updateCategoryDto.name;

    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category); //.remove permite eliminar varias en una sola consulta
    return 'Categoria Eliminada';
  }
}
