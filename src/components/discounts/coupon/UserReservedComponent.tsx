import React from "react";
import style from './DiscountCouponComponent.module.css'


type Props = {
    user: string
}

const UserReservedComponent: React.FC<Props> = ({user}) => {

    return (

        <div className={style["item-modal"]}>
            <div className={style["title"]}>Zaklepane</div>
            <div className={style["user"]}><span>przez: </span>
                {user}
            </div>
            <div className={style["after-text"]}>Next time wariacie 🤙</div>
        </div>

    )
}

export default UserReservedComponent