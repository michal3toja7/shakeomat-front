import React, {useEffect, useState} from "react";
import style from './DiscountContainerComponent.module.css'
import IDiscountCoupon from "../../types/discountCoupon.type";
import getDiscountCoupons from "../../services/discount.service";
import DiscountCouponComponent from "./coupon/DiscountCouponComponent";


type DiscountContainerComponentProps = {}

const DiscountContainerComponent: React.FC<DiscountContainerComponentProps> = () => {
    const [discountCoupons, setDiscountCoupons] = useState<IDiscountCoupon[]>()

    useEffect(() => {
        getDiscountCoupons().then(result => {
            setDiscountCoupons(result.results)
        })
    }, []);

    const discountsUpdate = (discount: IDiscountCoupon) => {
        if (!discountCoupons)
            return
        let tempDiscounts = discountCoupons
        const index = tempDiscounts.findIndex(discountCoupon => {
            return discountCoupon.id === discount.id;
        });
        tempDiscounts[index] = discount
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