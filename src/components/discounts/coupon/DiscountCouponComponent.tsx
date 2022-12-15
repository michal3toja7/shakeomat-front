import React, {useState} from "react";
import style from './DiscountCouponComponent.module.css'
import IDiscountCoupon from "../../../types/discountCoupon.type";
import DoneIcon from "../../../assets/DoneIcon";
import LockIcon from "../../../assets/LockIcon";
import VisibilityIcon from "../../../assets/VisibilityIcon";
import GroupIcon from "../../../assets/GroupIcon";
import CouponControlButton from "./CouponControlButton";
import CouponInformationComponent from "./CouponInformationComponent";
import {
    MakePublicDiscountCoupon,
    ReserveDiscountCoupon,
    UndoReserveDiscountCoupon,
    UseUpDiscountCoupon
} from "../../../services/discount.service";
import UserReservedComponent from "./UserActionComponent";
import CouponConfirmationComponent from "./CouponConfirmationComponent";
import {useSearchParams} from "react-router-dom";
import UnlockIcon from "../../../assets/UnlockIcon";


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
    const [invisible, setInvisible] = useState<boolean>(false)
    const [searchParams] = useSearchParams()
    const getType = () => {
        return searchParams.get("type") || "private"
    }

    const onShowHandler = () => {
        if (informationIsOpen) {
            onCloseInformation()
            return
        }
        setInformationIsOpen(prevState => !prevState)
    }
    const onReserveHandler = () => {
        ReserveDiscountCoupon(discountCoupon, getType())
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

    const selfDestroyer = (discount: IDiscountCoupon) => {
        setInvisible(true)
        setTimeout(() => {
            discountUpdate(discount, true)
        }, 600)
    }


    const onMakePublicHandler = () => {
        MakePublicDiscountCoupon(discountCoupon, getType())
            .then(updatedDiscountCoupon => {
                selfDestroyer(updatedDiscountCoupon)
            })
    }
    const onUndoReservationHandler = () => {
        UndoReserveDiscountCoupon(discountCoupon, getType())
            .then(updatedDiscountCoupon => {
                selfDestroyer(updatedDiscountCoupon)
            })
    }

    const onConfirmationHandler = (confirmationResponse: boolean) => {
        if (confirmationResponse)
            UseUpDiscountCoupon(discountCoupon, getType())
                .then(updatedDiscountCoupon => {
                    setIsUsed(updatedDiscountCoupon.status.status === "USED")
                    discountUpdate(updatedDiscountCoupon)
                    setShowConfirmation(false)

                })
        else
            setShowConfirmation(false)
    }

    return (
        <div
            className={`${style["discount-item"]} ${informationIsOpen && style["show-information"]} ${invisible && style["invisible"]}`}>
            {((isReserved && getType()!=="reserved") || isUsed) && (
                <UserReservedComponent reserved={(isReserved&& getType()!=="reserved")} used={isUsed}
                                       user={discountCoupon.status.reserved_by || discountCoupon.status.used_by || ""}/>
            )
            }
            {showConfirmation && (
                <CouponConfirmationComponent confirmationLiftUp={onConfirmationHandler} verification={tryUse}/>
            )
            }

            <div className={style["discount-item-container"]}>
                <div className={style["image-container"]}>
                    <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title || ""}></img>
                </div>
                <div className={style["item-control-container"]} style={{position: "relative"}}>
                    {informationIsOpen && (
                        <CouponInformationComponent couponCard={discountCoupon.discount_card}
                                                    isOpen={informationIsOpen}
                                                    setIsClose={onCloseInformation}/>
                    )}
                    {getType() !== "reserved" &&
                        <CouponControlButton text={"Rezerwuj"} Icon={LockIcon} buttonAction={onReserveHandler}/>
                    }
                    {getType() === "reserved" &&
                        <CouponControlButton text={"Odblokuj"} Icon={UnlockIcon} buttonAction={onUndoReservationHandler}/>
                    }
                    <CouponControlButton text={"Pokaż"} Icon={VisibilityIcon} buttonAction={onShowHandler}/>
                    {getType()==="private" &&
                        <CouponControlButton text={"Udostępnij"} Icon={GroupIcon} buttonAction={onMakePublicHandler}/>
                    }
                    <CouponControlButton text={"Użyj"} Icon={DoneIcon} buttonAction={onUseHandler}/>
                </div>
            </div>
        </div>

    )
}

export default DiscountCouponComponent