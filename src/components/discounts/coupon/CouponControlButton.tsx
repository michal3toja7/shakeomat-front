import React from "react";
import style from './DiscountCouponComponent.module.css'


type Props = {
    text: string
    Icon: React.FC
    buttonAction: Function
}

const CouponControlButton: React.FC<Props> = ({text, Icon, buttonAction}: Props) => {
    const onButtonClick = () => {
        buttonAction()
    }

    return (
        <div className={style["control-item"]} onClick={onButtonClick}>
                    <span className={style["icon"]}>
                        <Icon/>
                    </span>
            {text}
        </div>

    )
}

export default CouponControlButton