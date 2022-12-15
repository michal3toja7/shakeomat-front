import React from "react";
import style from "./Button.module.css"


type ButtonProps = {
    buttonText: string,
    onClick?: any
    disabled?: boolean
    value?: string
    primary?: boolean
}

const Button: React.FC<ButtonProps> = ({buttonText, onClick, disabled, value, primary = true}: ButtonProps) => {

    return (
        <button className={`${style.btn} ${primary ? style.primary : style.secondary}`}
                onClick={onClick}
                value={value}
                disabled={disabled}>
            <span>{buttonText}</span>
        </button>
    )
}
export default Button