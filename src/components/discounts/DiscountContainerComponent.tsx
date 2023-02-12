import React, {useEffect, useState} from "react";
import IDiscountCoupon from "../../types/discountCoupon.type";
import DiscountCouponComponent from "./coupon/DiscountCouponComponent";
import getDiscountCoupons from "../../services/discount.service";
import LoadingModal from "../siteBase/LoadingModal";
import {Container, Grid} from "@mui/material";


type DiscountContainerComponentProps = {
    discountsType: string
}

const DiscountContainerComponent: React.FC<DiscountContainerComponentProps> = ({discountsType}) => {
    const [discountCoupons, setDiscountCoupons] = useState<IDiscountCoupon[]>()
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        setLoading(true)
        getDiscountCoupons(discountsType)
            .then(result => {
                setDiscountCoupons(result.results)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [discountsType]);

    const discountsUpdate = (discount: IDiscountCoupon, remove: boolean = false) => {
        if (!discountCoupons)
            return
        let tempDiscounts = discountCoupons
        const index = tempDiscounts.findIndex(discountCoupon => {
            return discountCoupon.id === discount.id;
        });
        if (!remove)
            tempDiscounts[index] = discount
        else
            tempDiscounts = tempDiscounts.filter(item => item.id !== discount.id)
        setDiscountCoupons([...tempDiscounts])
    }

    return (
        <Container>
            <Grid container>
                {
                    discountCoupons?.map(discountCoupon => {
                        return (
                            <Grid item xs={12} md={6} lg={4}>
                                <DiscountCouponComponent key={discountCoupon.id}
                                                         discountCoupon={discountCoupon}
                                                         discountUpdate={discountsUpdate}
                                                         discountsType={discountsType}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
            <LoadingModal isLoading={loading}/>
        </Container>
    )
}

export default DiscountContainerComponent