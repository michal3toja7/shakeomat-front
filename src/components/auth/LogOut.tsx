import React, {useEffect, useState} from "react";
import {logout} from "../../services/auth.service";
import {NavigateFunction, useNavigate} from "react-router-dom";
import LoadingModal from "../siteBase/LoadingModal";

type LogOutProps = {
}

const LogOut: React.FC<LogOutProps> = () => {
    let navigate: NavigateFunction = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        logout()
        setLoading(false)
        navigate("/logowanie")

    }, [navigate]);

    return (
        <div>
            <LoadingModal isLoading={loading} loadingMassage={"Wylogowywanie"}/>
        </div>
    )
}
export default LogOut