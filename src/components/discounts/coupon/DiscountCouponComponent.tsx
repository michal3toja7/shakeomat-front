import React, {useState} from "react";
import style from './DiscountCouponComponent.module.css'
import IDiscountCoupon from "../../../types/discountCoupon.type";
import DoneIcon from '@mui/icons-material/Done';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
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
import {Button, Card, CardActions, CardContent, CardMedia, Fab, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";


type DiscountCouponComponentProps = {
    discountCoupon: IDiscountCoupon,
    discountUpdate: Function,
    discountsType: string
}

const DiscountCouponComponent: React.FC<DiscountCouponComponentProps> = ({
                                                                             discountCoupon,
                                                                             discountUpdate,
                                                                             discountsType
                                                                         }) => {
    const [informationIsOpen, setInformationIsOpen] = useState<boolean>(false)
    const [isReserved, setIsReserved] = useState<boolean>(discountCoupon.status.status === "RESERVED")
    const [isUsed, setIsUsed] = useState<boolean>(discountCoupon.status.status === "USED")
    const [tryUse, setTryUse] = useState<boolean>(false)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [invisible, setInvisible] = useState<boolean>(false)

    const onShowHandler = () => {
        if (informationIsOpen) {
            onCloseInformation()
            return
        }
        setInformationIsOpen(prevState => !prevState)
    }
    const onReserveHandler = () => {
        ReserveDiscountCoupon(discountCoupon, discountsType)
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
        MakePublicDiscountCoupon(discountCoupon, discountsType)
            .then(updatedDiscountCoupon => {
                selfDestroyer(updatedDiscountCoupon)
            })
    }
    const onUndoReservationHandler = () => {
        UndoReserveDiscountCoupon(discountCoupon, discountsType)
            .then(updatedDiscountCoupon => {
                selfDestroyer(updatedDiscountCoupon)
            })
    }

    const onConfirmationHandler = (confirmationResponse: boolean) => {
        if (confirmationResponse)
            UseUpDiscountCoupon(discountCoupon, discountsType)
                .then(updatedDiscountCoupon => {
                    setIsUsed(updatedDiscountCoupon.status.status === "USED")
                    discountUpdate(updatedDiscountCoupon)
                    setShowConfirmation(false)

                })
        else
            setShowConfirmation(false)
    }

    return (
        // <div
        //     className={`${style["discount-item"]} ${informationIsOpen && style["show-information"]} ${invisible && style["invisible"]}`}>
        //     {((isReserved && discountsType!=="reserved") || isUsed) && (
        //         <UserReservedComponent reserved={(isReserved&& discountsType!=="reserved")} used={isUsed}
        //                                user={discountCoupon.status.reserved_by || discountCoupon.status.used_by || ""}/>
        //     )
        //     }
        //     {showConfirmation && (
        //         <CouponConfirmationComponent confirmationLiftUp={onConfirmationHandler} verification={tryUse}/>
        //     )
        //     }
        //
        //     <div className={style["discount-item-container"]}>
        //         <div className={style["image-container"]}>
        //             <img src={discountCoupon.discount_image} alt={discountCoupon.discount_title || ""}></img>
        //         </div>
        //         <div className={style["item-control-container"]} style={{position: "relative"}}>
        //             {informationIsOpen && (
        //                 <CouponInformationComponent couponCard={discountCoupon.discount_card}
        //                                             isOpen={informationIsOpen}
        //                                             setIsClose={onCloseInformation}/>
        //             )}
        //             {discountsType !== "reserved" &&
        //                 <CouponControlButton text={"Rezerwuj"} Icon={LockIcon} buttonAction={onReserveHandler}/>
        //             }
        //             {discountsType === "reserved" &&
        //                 <CouponControlButton text={"Odblokuj"} Icon={UnlockIcon} buttonAction={onUndoReservationHandler}/>
        //             }
        //             <CouponControlButton text={"Pokaż"} Icon={VisibilityIcon} buttonAction={onShowHandler}/>
        //             {discountsType==="private" &&
        //                 <CouponControlButton text={"Udostępnij"} Icon={GroupIcon} buttonAction={onMakePublicHandler}/>
        //             }
        //             <CouponControlButton text={"Użyj"} Icon={DoneIcon} buttonAction={onUseHandler}/>
        //         </div>
        //     </div>
        // </div>
        <Card>
            <CardMedia
                component="img"
                width="100%"
                image={discountCoupon.discount_image}
                alt={discountCoupon.discount_title || ""}
                sx={{objectFit: "contain"}}
            />
            <CardContent>
                <CouponInformationComponent couponCard={discountCoupon.discount_card}
                                            isOpen={informationIsOpen}
                                            setIsClose={onCloseInformation}/>
            </CardContent>
            <CardActions>
                {informationIsOpen && (
                    <CouponInformationComponent couponCard={discountCoupon.discount_card}
                                                isOpen={informationIsOpen}
                                                setIsClose={onCloseInformation}/>
                )}
                {discountsType !== "reserved" &&
                    <Fab onClick={onReserveHandler}>
                        <LockIcon fontSize={"large"}/>
                        Rezerwuj
                    </Fab>
                }
                {discountsType === "reserved" &&
                    <Fab onClick={onUndoReservationHandler}>
                        <LockOpenIcon fontSize={"large"}/>
                        Odblokuj
                    </Fab>
                }
                <Fab onClick={onShowHandler}>
                    <VisibilityIcon fontSize={"large"}/>
                    Pokaż
                </Fab>

                {discountsType === "private" &&
                    <Fab onClick={onMakePublicHandler}>
                        <GroupIcon fontSize={"large"}/>
                        Udostępnij
                    </Fab>
                }
                <Fab onClick={onUseHandler}>
                    <DoneIcon fontSize={"large"}/>
                    Użyj
                </Fab>

            </CardActions>
        </Card>
    )
}

export default DiscountCouponComponent