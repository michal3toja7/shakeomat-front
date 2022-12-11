import axios, {AxiosResponse} from "axios";
import API_URL from "../config/API_URL";
import {getUserData} from "./user.service";
import IDiscountCoupon from "../types/discountCoupon.type";
import authHeader from "./auth-header";

type DicountCouponsResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: IDiscountCoupon[]
}

const getDiscountCoupons = () => {
    return axios
        .get(API_URL + "discount-coupon/", {headers: authHeader()})
        .then((response: AxiosResponse<DicountCouponsResponse>) => {
            return response.data;
        });
}

export default getDiscountCoupons