import React, {useEffect, useState} from "react";
import style from './DiscountCouponModal.module.css'
import getDiscountCoupons from "../../../services/discount.service";


type Props = {
    rotated: boolean,
    children?: React.ReactNode
}

const CouponModalContainer: React.FC<Props> = ({rotated, children}) => {
    const [initComponent, setInitComponent] = useState<boolean>(true)

    useEffect(() => {
        setTimeout(() => {
            setInitComponent(false)
        }, 50)
    }, []);

    return (
        <div className={`${style["modal-container"]} ${initComponent && style["init"]}`}>
            <div className={`${style["item-modal"]} ${rotated && style["rotated"]} ${initComponent && style["init"]}`}>
                {children}
            </div>
        </div>
    )
}

export default CouponModalContainer