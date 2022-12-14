import React from "react";
import CouponModalContainer from "./CouponModalContainer";
import style from './DiscountCouponComponent.module.css'


type Props = {
    user: string
    reserved: boolean,
    used: boolean
}

const UserActionComponent: React.FC<Props> = ({user, reserved, used}) => {
    const title = used ? "Wykorzystane" : reserved ? "Zaklepane" : "";

    return (
        <CouponModalContainer rotated={true}>
            <div className={style["title"]}>{title}</div>
            <div className={style["user"]}><span>przez: </span>
                {user}
            </div>
            <div className={style["after-text"]}>Next time wariacie 🤙</div>
        </CouponModalContainer>
    )
}

export default UserActionComponent