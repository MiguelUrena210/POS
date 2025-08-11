import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({message: 'Nombre del producto es obligatorio'})
    @IsString({message: 'Nombre no válido'})
    name: string;

    @IsNotEmpty({message: 'El precio del producto es obligatorio'})
    @IsNumber({maxDecimalPlaces: 2}, {message: 'Precio no válido'})
    price: number;

    @IsNotEmpty({message: 'Cantidad no puede ser vacia'})
    @IsInt({message: 'Inventario no válido'})
    inventory: number;

    @IsNotEmpty({message: 'Categoría no puede ser vacia'})
    @IsInt({message: 'Categoría no válida'})
    categoryId: number;
}
