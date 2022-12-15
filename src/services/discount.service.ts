import axios, {AxiosResponse} from "axios";
import API_URL from "../config/API_URL";
import IDiscountCoupon from "../types/discountCoupon.type";
import authHeader from "./auth-header";

type DicountCouponsResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: IDiscountCoupon[]
}
const DISCOUNTS_TYPE: { [id: string]: string; } = {
    "PRIVATE": "discount-coupon/",
    "PUBLIC": "discount-public-coupon/",
    "RESERVED": "discount-reserved-coupon/"

}

const getDiscountURL = (type: string) => {
    return API_URL + DISCOUNTS_TYPE[type]
}

const getDiscountCoupons = (type: string = "PRIVATE") => {

    return axios
        .get(getDiscountURL(type), {headers: authHeader()})
        .then((response: AxiosResponse<DicountCouponsResponse>) => {
            return response.data;
        });
}
export const ReserveDiscountCoupon = (discountCoupon: IDiscountCoupon, type: string = "PRIVATE") => {
    return axios
        .post(`${getDiscountURL(type)}${discountCoupon.id}/make_reservation/`, {}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}
export const UseUpDiscountCoupon = (discountCoupon: IDiscountCoupon, type: string = "PRIVATE") => {
    return axios
        .post(`${getDiscountURL(type)}${discountCoupon.id}/use_up/`, {}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}
export const MakePublicDiscountCoupon = (discountCoupon: IDiscountCoupon, type: string = "PRIVATE") => {
    return axios
        .post(`${getDiscountURL(type)}${discountCoupon.id}/set_public/`, {}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}
export const UndoReserveDiscountCoupon = (discountCoupon: IDiscountCoupon, type: string = "PRIVATE") => {
    return axios
        .post(`${getDiscountURL(type)}${discountCoupon.id}/undo_reservation/`, {}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}

export default getDiscountCoupons