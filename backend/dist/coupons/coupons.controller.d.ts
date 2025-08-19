import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApplyCouponDto } from './dto/apply-coupon.dto';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<CreateCouponDto & import("./entities/coupon.entity").Coupon>;
    findAll(): Promise<import("./entities/coupon.entity").Coupon[]>;
    findOne(id: string): Promise<import("./entities/coupon.entity").Coupon[]>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<import("./entities/coupon.entity").Coupon[]>;
    remove(id: string): Promise<string>;
    applyCoupon(applyCouponDto: ApplyCouponDto): Promise<{
        id: Number;
        name: string;
        percentage: number;
        expirationDate: Date;
        message: string;
    }>;
}
