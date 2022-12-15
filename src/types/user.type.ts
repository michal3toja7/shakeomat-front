export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserToken {
    access: string,
    refresh: string
}

export interface IUser {
    username: string,
    user_profile: IUserProfile,
    url: string
}

export interface IUserProfile {
    first_name: string,
    last_name: string,
    username: string,

}