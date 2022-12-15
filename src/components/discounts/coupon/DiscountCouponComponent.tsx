import React, {useState} from "react";
import style from './DiscountCouponComponent.module.css'
import IDiscountCoupon from "../../../types/discountCoupon.type";
import DoneIcon from "../../../assets/DoneIcon";
import LockIcon from "../../../assets/LockIcon";
import VisibilityIcon from "../../../assets/VisibilityIcon";
import GroupIcon from "../../../assets/GroupIcon";
import CouponControlButton from "./CouponControlButton";
import CouponInformationComponent from "./CouponInformationComponent";
import {reserveDiscountCoupon} from "../../../services/discount.service";
import UserReservedComponent from "./UserActionComponent";
import CouponConfirmationComponent from "./CouponConfirmationComponent";


type DiscountCouponComponentProps = {
    discountCoupon: IDiscountCoupon,
    discountUpdate: Function
}

const DiscountCouponComponent: React.FC<DiscountCouponComponentProps> = ({discountCoupon, discountUpdate}) => {
    const [informationIsOpen, setInformationIsOpen] = useState<boolean>(false)
    const [isReserved, setIsReserved] = useState<boolean>(discountCoupon.status.status === "RESERVED")
    const [isUsed, setIsUsed] = useState<boolean>(discountCoupon.status.status === "USED")
    const [tryUse, setTryUse] = useState<boolean>(false)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

    const onShowHandler = () => {
        if (informationIsOpen) {
            onCloseInformation()
            return
        }
        setInformationIsOpen(prevState => !prevState)
    }
    const onReserveHandler = () => {
        reserveDiscountCoupon(discountCoupon)
            .then(updatedDiscountCoupon => {
                setIsReserved(updatedDiscountCoupon.status.status === "RESERVED")
                discountUpdate(updatedDiscountCoupon)
            })
    }

    const onCloseInformation = () => {
        setInformationIsOpen(false)
        setShowConfirmation(true)
        setTryUse(false)
    }

    const onUseHandler = () => {
        setShowConfirmation(true)
        setTryUse(true)
    }

    const onConfirmationHandler = () => {
        setShowConfirmation(false)
    }

    return (
        <div className={`${style["discount-item"]} ${informationIsOpen && style["show-information"]}`}>
            {(isReserved || isUsed) && (
                <UserReservedComponent reserved={isReserved} used={isUsed}
                                       user={discountCoupon.status.reserved_by || ""}/>
            )
            }
            {showConfirmation && (
                <CouponConfirmationComponent confirmationLiftUp={onConfirmationHandler} verification={tryUse}/>
            )
            }

            <div className={`${style["discount-item-container"]} ${isReserved && style["reserved"]}`}>
                <div className={style["image-container"]}>
                    <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title || ""}></img>
                </div>
                <div className={style["item-control-container"]} style={{position: "relative"}}>
                    {informationIsOpen && (
                        <CouponInformationComponent couponCard={discountCoupon.discount_card}
                                                    isOpen={informationIsOpen}
                                                    setIsClose={onCloseInformation}/>
                    )}
                    <CouponControlButton text={"Rezerwuj"} Icon={LockIcon} buttonAction={onReserveHandler}/>
                    <CouponControlButton text={"Pokaż"} Icon={VisibilityIcon} buttonAction={onShowHandler}/>
                    <CouponControlButton text={"Udostępnij"} Icon={GroupIcon} buttonAction={() => null}/>
                    <CouponControlButton text={"Użyj"} Icon={DoneIcon} buttonAction={onUseHandler}/>
                </div>
            </div>
        </div>

    )
}

export default DiscountCouponComponent