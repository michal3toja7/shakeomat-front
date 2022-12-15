import axios from "axios";
import authHeader from "./auth-header";
import API_URL from "../config/API_URL"
import {IUser} from "../types/user.type";


export const getUserData = () => {
    return axios.get(API_URL + "users/me", {headers: authHeader()})
};

const unauthorized: IUser = {
    username: "unauthorized",
    user_profile: {
        last_name: "",
        first_name: "",
        username: "",
    },
    url: ""
}

export const getCurrentUser = (): IUser => {
    let userStr = localStorage.getItem("currentUser");
    if (userStr)
        return JSON.parse(userStr)
    return unauthorized
}


export const isAuth = (): boolean => {
    return (getCurrentUser().username !== "unauthorized")
}
