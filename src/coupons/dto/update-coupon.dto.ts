import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { IsString, IsInt, Max, Min, IsDateString } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @IsString({ message: 'Valor no válido para el nombre' })
  name: string;

  @IsInt({ message: 'El descuento debe ser entre 1 y 100 en enteros' })
  @Max(100, { message: ' El descuento máximo es de 100' })
  @Min(1, { message: 'El descuento minimo es de 1' })
  percentage: number;

  @IsDateString({}, { message: 'Fecha no válida' })
  expirationDate: Date;
}
