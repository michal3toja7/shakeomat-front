import React, {useEffect, useState} from "react";
import style from './DiscountContainerComponent.module.css'
import IDiscountCoupon from "../../types/discountCoupon.type";
import DiscountCouponComponent from "./coupon/DiscountCouponComponent";
import getDiscountCoupons from "../../services/discount.service";
import {useSearchParams} from "react-router-dom";


type DiscountContainerComponentProps = {}

const DiscountContainerComponent: React.FC<DiscountContainerComponentProps> = () => {
    const [discountCoupons, setDiscountCoupons] = useState<IDiscountCoupon[]>()
    const [searchParams] = useSearchParams()
    const getType = () => {
        return searchParams.get("type") || "private"
    }


    useEffect(() => {
        getDiscountCoupons(getType()).then(result => {
            setDiscountCoupons(result.results)
        })
    }, [searchParams]);

    const discountsUpdate = (discount: IDiscountCoupon, remove: boolean = false) => {
        if (!discountCoupons)
            return
        let tempDiscounts = discountCoupons
        const index = tempDiscounts.findIndex(discountCoupon => {
            return discountCoupon.id === discount.id;
        });
        if (!remove)
            tempDiscounts[index] = discount
        else
            tempDiscounts = tempDiscounts.filter(item => item.id !== discount.id)
        setDiscountCoupons([...tempDiscounts])
    }

    return (
        <div className={style["container"]}>
            <div className={style["discount-container"]}>
                {
                    discountCoupons?.map(discountCoupon => {
                        return (
                            <DiscountCouponComponent key={discountCoupon.id}
                                                     discountCoupon={discountCoupon}
                                                     discountUpdate={discountsUpdate}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DiscountContainerComponent