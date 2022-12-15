import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import style from "./LoadingModal.module.css"
import LogoSVG from "../../assets/LogoSVG";

type LoadingModalItemProps = {
    isLoading: boolean
    loadingMassage?: string
}

const LoadingModalItem: React.FC<LoadingModalItemProps> = ({isLoading, loadingMassage}: LoadingModalItemProps) => {
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!isLoading && isLoading !== loading)
            setTimeout(() => {
                setLoading(false)
            }, 600)
        if (isLoading && isLoading !== loading)
            setLoading(isLoading)

            }, [isLoading]);
    return (
        <div className={`${style["loader-container"]} ${isLoading && style["show-modal"]} ${!loading && style["display-none"]}`}>
            <div className={style.loader}>
                <LogoSVG/>
            </div>
            {loadingMassage && (
                <div className={"load-description"}>
                    {loadingMassage}
                </div>
            )}
        </div>

    )
}


type LoadingModalProps = {
    isLoading: boolean
    loadingMassage?: string
}

const LoadingModal: React.FC<LoadingModalProps> = ({isLoading, loadingMassage}: LoadingModalProps) => {
    const portalModalRoot = document.getElementById("modal-root")!
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <LoadingModalItem isLoading={isLoading} loadingMassage={loadingMassage}/>,
                portalModalRoot
            )}

        </React.Fragment>
    )
}

export default LoadingModal