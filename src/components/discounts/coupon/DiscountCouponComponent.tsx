import React from "react";
import style from './DiscountCouponComponent.module.css'
import IDiscountCoupon from "../../../types/discountCoupon.type";
import DoneIcon from "../../../assets/DoneIcon";
import LockIcon from "../../../assets/LockIcon";
import VisibilityIcon from "../../../assets/VisibilityIcon";
import GroupIcon from "../../../assets/GroupIcon";


type DiscountCouponComponentProps = {
    discountCoupon: IDiscountCoupon
}

const DiscountCouponComponent: React.FC<DiscountCouponComponentProps> = ({discountCoupon}: DiscountCouponComponentProps) => {

    return (
        <div className={style["discount-item"]}>
            <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title || ""}></img>
            <div className={style["item-control-container"]}>
                <div className={`${style["control-item"]} ${style["reserve"]}`}>
                    <span className={style["icon"]}>
                        <LockIcon/>
                    </span>
                    Rezerwuj
                </div>
                <div className={`${style["control-item"]} ${style["show"]}`}>
                    <span className={style["icon"]}>
                        <VisibilityIcon/>
                    </span>
                    Pokaż
                </div>
                <div className={`${style["control-item"]} ${style["make-public"]}`}>
                    <span className={style["icon"]}>
                        <GroupIcon/>
                    </span>
                    Udostępnij
                    {/*Do <br/>publicznych*/}
                </div>
                <div className={`${style["control-item"]} ${style["use-up"]}`}>
                    <span className={style["icon"]}>
                        <DoneIcon/>
                    </span>
                    Użyj
                </div>


            </div>
        </div>
    )
}

export default DiscountCouponComponent