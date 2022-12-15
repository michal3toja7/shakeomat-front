import React from "react";
import CouponModalContainer from "./CouponModalContainer";
import style from './DiscountCouponModal.module.css'
import Button from "../../siteBase/Button";


type Props = {
    verification?: boolean
    confirmationLiftUp: Function

}

const CouponConfirmationComponent: React.FC<Props> = ({verification = true, confirmationLiftUp}) => {
    const title = verification ? "Czy na pewno chcesz wykorzystać kupon?" : "Czy wykorzystałeś kupon?"
    const onAnswerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        confirmationLiftUp(e.currentTarget.value === "true")
    }


    return (
        <CouponModalContainer rotated={false}>
            <div className={style["user"]}>
                {title}
            </div>
            <div className={style["confirmation-container"]}>
                <Button value="false" onClick={onAnswerHandler} buttonText={"Nie"} primary={false}></Button>
                <Button value={"true"} onClick={onAnswerHandler} buttonText={"Tak"} primary={true}></Button>
            </div>
            <div className={style["after-text"]}>Tego nie cofniesz wariacie 🤙</div>
        </CouponModalContainer>
    )
}

export default CouponConfirmationComponent