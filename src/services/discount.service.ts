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

const getDiscountCoupons = () => {
    return axios
        .get(API_URL + "discount-coupon/", {headers: authHeader()})
        .then((response: AxiosResponse<DicountCouponsResponse>) => {
            return response.data;
        });
}
export const ReserveDiscountCoupon = (discountCoupon: IDiscountCoupon) => {
    return axios
        .post(`${API_URL}discount-coupon/${discountCoupon.id}/make_reservation/` ,{}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}
export const UseUpDiscountCoupon = (discountCoupon: IDiscountCoupon) => {
    return axios
        .post(`${API_URL}discount-coupon/${discountCoupon.id}/use_up/` ,{}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}
export const MakePublicDiscountCoupon = (discountCoupon: IDiscountCoupon) => {
    return axios
        .post(`${API_URL}discount-coupon/${discountCoupon.id}/set_public/` ,{}, {headers: authHeader()})
        .then((response: AxiosResponse<IDiscountCoupon>) => {
            return response.data;
        });
}

export default getDiscountCoupons