import React from "react";
import style from './DiscountCouponModal.module.css'


type Props = {
    rotated: boolean,
    children?: React.ReactNode
}

const CouponModalContainer: React.FC<Props> = ({rotated, children}) => {

    return (

        <div className={`${style["item-modal"]} ${rotated && style["rotated"]}`}>
            {children}
        </div>

    )
}

export default CouponModalContainer