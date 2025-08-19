import { IsString } from 'class-validator'

export class CreateCategoryDto {
    @IsString({ message: 'El nombre de la categoría debe ser un String' })
    name: string
}
