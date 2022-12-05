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
            <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title || ""}></img>
            <div className={style["item-control-container"]}>
                <div className={`${style["control-item"]} ${style["reserve"]}`}>
                    <span className={"icon"}></span>
                    Rezerwuj
                </div>
                <div className={`${style["control-item"]} ${style["show"]}`}>
                    <span className={"icon"}></span>
                    Pokaż kod/numer
                </div>
                <div className={`${style["control-item"]} ${style["make-public"]}`}>
                    <span className={"icon"}></span>
                    Przekaż do publicznych
                </div>
                <div className={`${style["control-item"]} ${style["use-up"]}`}>
                    <span className={"icon"}></span>
                    Użyj
                </div>


            </div>
        </div>
    )
}

export default DiscountCouponComponent