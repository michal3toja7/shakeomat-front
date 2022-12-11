import React from "react";
import style from './DiscountCouponComponent.module.css'


type Props = {
    text: string
    Icon: React.FC
}

const CouponControlButton: React.FC<Props> = ({text, Icon}: Props) => {

    return (
        <div className={style["control-item"]}>
                    <span className={style["icon"]}>
                        <Icon/>
                    </span>
            {text}
        </div>

    )
}

export default CouponControlButton