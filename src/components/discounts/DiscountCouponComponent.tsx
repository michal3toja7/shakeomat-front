import React, {useEffect, useState} from "react";
import style from './DiscountCouponComponent.module.css'
import IDiscountCoupon from "../../types/discountCoupon.type";
import getDiscountCoupons from "../../services/discount.service";


type DiscountCouponComponentProps = {
    discountCoupon: IDiscountCoupon
}

const DiscountCouponComponent: React.FC<DiscountCouponComponentProps> = ({discountCoupon}: DiscountCouponComponentProps) => {

    return (
        <div className={style["discount-item"]}>
            <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title||""}></img>
        </div>
    )
}

export default DiscountCouponComponent