import React, {useEffect, useState} from "react";
import style from './DiscountContainerComponent.module.css'
import IDiscountCoupon from "../../types/discountCoupon.type";
import getDiscountCoupons from "../../services/discount.service";
import DiscountCouponComponent from "./DiscountCouponComponent";


type DiscountContainerComponentProps = {}

const DiscountContainerComponent: React.FC<DiscountContainerComponentProps> = () => {
    const [discountCoupons, setDiscountCoupons] = useState<IDiscountCoupon[]>()

    useEffect(() => {
        getDiscountCoupons().then(result => {
            setDiscountCoupons(result.results)
        })
    }, []);

    return (
        <div className={style["container"]}>
            <div className={style["discount-container"]}>
                {
                    discountCoupons?.map(discountCoupon => {
                        return (
                            <DiscountCouponComponent discountCoupon={discountCoupon}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DiscountContainerComponent