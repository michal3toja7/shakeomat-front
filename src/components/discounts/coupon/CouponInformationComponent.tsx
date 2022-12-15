import React, {useEffect, useRef, useState} from "react";
import style from './DiscountCouponComponent.module.css'
import {IDiscountCard} from "../../../types/discountCoupon.type";
import bwipjs from "bwip-js";


type Props = {
    couponCard: IDiscountCard
    isOpen: boolean
    setIsClose: Function
}

const CouponInformationComponent: React.FC<Props> = ({couponCard, isOpen, setIsClose}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [openState, setOpenState] = useState<boolean>(false)
    useEffect(() => {
        if (isOpen)
            setTimeout(() => {
                setOpenState(isOpen)
            }, 1)
    }, []);


    useEffect(() => {
        let canvas = canvasRef.current
        if (canvas) {
            bwipjs.toCanvas(canvas, {
                bcid: "pdf417",
                text: couponCard.card_number.toString(),
                scale: 3,
                height: 10,
                includetext: true,
                textxalign: "center"
            });
        }
    }, [canvasRef, couponCard.card_number]);

    const onCloseHandler = () => {
        setOpenState(false)
        setTimeout(() => {
            setIsClose()
        }, 300)

    }

    return (
        <div className={`${style["information-container"]} ${!openState && style["close"]}`}>
            <div className={style["close-button"]} onClick={onCloseHandler}>
                X
            </div>
            <div className={style["information-title"]}>
                Aby użyć podaj:
            </div>
            <div className={style["information-line"]}>
                <div className={style["label"]}>
                    Numer telefonu:
                </div>
                <div className={style["information"]}>
                    {couponCard.phone_number}
                </div>
            </div>
            <div className={style["information-line"]}>
                <div className={style["label"]}>
                    Numer karty:
                </div>
                <div className={style["information"]}>
                    {couponCard.card_number}
                </div>
            </div>
            <div className={style["information-title"]}>
                Lub zeskanuj:
            </div>
            <div className={style["code-container"]}>
                <canvas ref={canvasRef}/>
            </div>
        </div>

    )
}

export default CouponInformationComponent