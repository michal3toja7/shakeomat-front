import React, {useState} from "react";
import {NavigateFunction, useNavigate} from 'react-router-dom';
import style from './Login.module.css'

import {login} from "../../services/auth.service";
import LogoSVG from "../../assets/LogoSVG";
import LoadingModal from "../siteBase/LoadingModal";
import {Button} from "@mui/material";

type LoginProps = {}


const Login: React.FC<LoginProps> = () => {
        let navigate: NavigateFunction = useNavigate();

        const [loading, setLoading] = useState<boolean>(false);
        const [message, setMessage] = useState<string>("");
        const [, setErrorMessage] = useState<string>("");
        const [isValidUserName, setIsValidUserName] = useState<boolean>(true);
        const [userName, setUserName] = useState<string>("");
        const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
        const [password, setPassword] = useState<string>("");


        const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(e.target.value)
            setIsValidUserName(validUserName(e.target.value))
        }

        const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
            setIsValidPassword(validPassword(e.target.value))

        }

        const validUserName = (userName: string) => {
            return (userName !== "")
        }
        const validPassword = (password: string) => {
            return (password !== "")
        }


        const handleLogin = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault()
            if (!(validUserName(userName) && validPassword(password))) {
                setIsValidPassword(validPassword(password))
                setIsValidUserName(validUserName(userName))
                setErrorMessage("Wprowadzone dane są nieprawidłowe")
                return
            }
            setMessage("Logowanie do systemu");
            setLoading(true);

            login(userName, password).then(
                () => {
                    // userChangeLiftUp()
                    navigate("/");
                    window.location.reload();
                },
                (error) => {
                    const errorObject = error.toJSON()
                    if (errorObject.status === 401) {
                        setErrorMessage("Nieprawidłowy użytkownik")
                    } else {
                        setErrorMessage("Logowanie nie powiodło się")
                    }
                    setLoading(false)
                }
            );
        };

        return (
            <React.Fragment>
                {/*{errorMessage && (*/}
                {/*    <AlertComponent errorMessage={errorMessage} alertType={"danger"}/>*/}
                {/*)}*/}
                <div className={style["container"]}>
                    <div className={style["login-container"]}>
                        <div className={style["logo-container"]}>
                            <LogoSVG/>
                        </div>
                        <form className={style["form-container"]}>
                                <div className={style["form-group"]}>
                                    <label htmlFor="userName">Nazwa użytkownika:</label>
                                    <input required
                                           name="userName"
                                           type="userName"
                                           onChange={userNameHandler}
                                           value={userName}/>
                                    {!isValidUserName && (
                                        <p className={style.error}>Nazwa użytkownika jest nieprawidłowa</p>
                                    )}
                                </div>
                                <div className={style["form-group"]}>
                                    <label htmlFor="password">Hasło:</label>
                                    <input name="password"
                                           type="password"
                                           required
                                           value={password}
                                           onChange={passwordHandler}/>
                                    {!isValidPassword && (
                                        <p className={style.error}>Hasło jest wymagane</p>
                                    )}

                                </div>
                            <div className={`${style["form-group"]} ${style["button"]}`}>
                                <Button onClick={handleLogin} disabled={loading}>
                                    Zaloguj
                                </Button>
                            </div>
                        </form>
                        <LoadingModal isLoading={loading} loadingMassage={message}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
;

export default Login;