import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';
export declare class CouponsService {
    private readonly couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    create(createCouponDto: CreateCouponDto): Promise<CreateCouponDto & Coupon>;
    findAll(): Promise<Coupon[]>;
    findOne(id: number): Promise<Coupon[]>;
    update(id: number, updateCouponDto: UpdateCouponDto): Promise<Coupon[]>;
    remove(id: number): Promise<string>;
    applyCoupon(name: string): Promise<{
        id: Number;
        name: string;
        percentage: number;
        expirationDate: Date;
        message: string;
    }>;
}
