import React, {useState} from "react";
import style from './DiscountCouponComponent.module.css'
import IDiscountCoupon from "../../../types/discountCoupon.type";
import DoneIcon from "../../../assets/DoneIcon";
import LockIcon from "../../../assets/LockIcon";
import VisibilityIcon from "../../../assets/VisibilityIcon";
import GroupIcon from "../../../assets/GroupIcon";
import CouponControlButton from "./CouponControlButton";
import CouponInformationComponent from "./CouponInformationComponent";


type DiscountCouponComponentProps = {
    discountCoupon: IDiscountCoupon
}

const DiscountCouponComponent: React.FC<DiscountCouponComponentProps> = ({discountCoupon}: DiscountCouponComponentProps) => {
    const [informationIsOpen, setInformationIsOpen] = useState<boolean>(false)

    const onShowHandler = () => {
        setInformationIsOpen(prevState => !prevState)
    }

    return (
        <div className={`${style["discount-item"]} ${informationIsOpen && style["show-information"]}`}>
            <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title || ""}></img>
            <div className={style["item-control-container"]} style={{position: "relative"}}>
                <CouponInformationComponent couponCard={discountCoupon.discount_card} isOpen={informationIsOpen}/>
                <CouponControlButton text={"Rezerwuj"} Icon={LockIcon} buttonAction={() => null}/>
                <CouponControlButton text={"Pokaż"} Icon={VisibilityIcon} buttonAction={onShowHandler}/>
                <CouponControlButton text={"Udostępnij"} Icon={GroupIcon} buttonAction={() => null}/>
                <CouponControlButton text={"Użyj"} Icon={DoneIcon} buttonAction={() => null}/>
            </div>
        </div>
    )
}

export default DiscountCouponComponent