import React, {useState} from "react";
import IDiscountCoupon from "../../../types/discountCoupon.type";
import DoneIcon from '@mui/icons-material/Done';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CouponInformationComponent from "./CouponInformationComponent";
import {
    MakePublicDiscountCoupon,
    ReserveDiscountCoupon,
    UndoReserveDiscountCoupon,
    UseUpDiscountCoupon
} from "../../../services/discount.service";
import UserReservedComponent from "./UserActionComponent";
import CouponConfirmationComponent from "./CouponConfirmationComponent";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Card,
    CardActions,
    CardMedia,
    Fab, Fade
} from "@mui/material";
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
        <Fade in={!invisible}>
            <Card>
                <CardMedia
                    component="img"
                    image={discountCoupon.discount_image}
                    alt={discountCoupon.discount_title || ""}
                    sx={{objectFit: "contain"}}
                />
                {((isReserved && discountsType !== "reserved") || isUsed) && (
                    <UserReservedComponent reserved={(isReserved && discountsType !== "reserved")} used={isUsed}
                                           user={discountCoupon.status.reserved_by || discountCoupon.status.used_by || ""}/>
                )
                }
                {showConfirmation && (
                    <CouponConfirmationComponent confirmationLiftUp={onConfirmationHandler} verification={tryUse}/>
                )}

                <CardActions>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: "100%",
                            left: 0,
                            width: "100%",
                            height: "fit-content",
                        }}
                    >
                        <Accordion expanded={informationIsOpen}>
                            <AccordionSummary/>
                            <AccordionDetails>
                                <CouponInformationComponent couponCard={discountCoupon.discount_card}
                                                            setIsClose={onCloseInformation}/>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    {discountsType !== "reserved" &&
                        <Fab onClick={onReserveHandler}
                             disabled={((isReserved && discountsType !== "reserved") || isUsed || showConfirmation)}>
                            <LockIcon fontSize={"large"}/>
                            Rezerwuj
                        </Fab>
                    }
                    {discountsType === "reserved" &&
                        <Fab onClick={onUndoReservationHandler}
                             disabled={((isReserved && discountsType !== "reserved") || isUsed || showConfirmation)}>
                            <LockOpenIcon fontSize={"large"}/>
                            Odblokuj
                        </Fab>
                    }
                    <Fab onClick={onShowHandler}
                         disabled={((isReserved && discountsType !== "reserved") || isUsed || showConfirmation)}>
                        <VisibilityIcon fontSize={"large"}/>
                        Pokaż
                    </Fab>

                    {discountsType === "private" &&
                        <Fab onClick={onMakePublicHandler}
                             disabled={(isReserved || isUsed || showConfirmation)}>
                            <GroupIcon fontSize={"large"}/>
                            Udostępnij
                        </Fab>
                    }
                    <Fab onClick={onUseHandler}
                         disabled={((isReserved && discountsType !== "reserved") || isUsed || showConfirmation)}>
                        <DoneIcon fontSize={"large"}/>
                        Użyj
                    </Fab>

                </CardActions>
            </Card>
        </Fade>
    )
}

export default DiscountCouponComponent