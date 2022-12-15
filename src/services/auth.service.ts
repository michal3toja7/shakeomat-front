import axios from "axios";
import API_URL from "../config/API_URL"
import {IUserToken} from "../types/user.type";
import {getUserData} from "./user.service";



export const login = (username: string, password: string) => {
    return axios
        .post(API_URL + "token/", {
            username,
            password
        })
        .then(async(response) => {
            if ( response.data.access) {
                localStorage.setItem("authUser", JSON.stringify(response.data));
                 await getUserData().then((response) => {
                        localStorage.setItem("currentUser", JSON.stringify(response.data));
                        return response.data
                    }
                );
            }
            return response.data;
        });
};


export const logout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("currentUser");
};

export const getCurrentUserToken = (): IUserToken | null => {
    const userStr = localStorage.getItem("authUser");
    if (userStr) return JSON.parse(userStr);

    return null;
};