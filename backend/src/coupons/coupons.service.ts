import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
import { endOfDay, isAfter } from 'date-fns';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}

  create(createCouponDto: CreateCouponDto) {
    return this.couponRepository.save(createCouponDto);
  }

  findAll() {
    return this.couponRepository.find();
  }

  async findOne(id: number) {
    const coupon = await this.couponRepository.findBy({ id });
    if (!coupon)
      throw new NotFoundException('No se encontró un cupón con el id ' + id);
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.findOne(id);
    Object.assign(coupon, updateCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async remove(id: number) {
    const coupon = await this.findOne(id);
    await this.couponRepository.remove(coupon);
    return 'Cupón eliminado';
  }

  async applyCoupon(name: string) {
    const coupon = await this.couponRepository.findOneBy({ name });
    if (!coupon) {
      throw new NotFoundException('No se encontró un cupón con ese nombre');
    }

    const currentDate = new Date(); // fecha actual
    const expirationDate = endOfDay(coupon.expirationDate);

    if(isAfter(currentDate,expirationDate)){
      throw new UnprocessableEntityException('El cupón ya ha expirado')
    }

    return {
      message: 'Cupón válido',
      ...coupon
    }
  }
}
