import React from "react";
import style from './NavBarComponent.module.css'


type NavBarProps = {}

const NavBarComponent: React.FC<NavBarProps> = () => {

    return (
        <nav className={`${style["nav-bar"]} ${style["nav-bar-container"]}`}>
            <div className={style["logo-container"]}>
            </div>

        </nav>
    )
}

export default NavBarComponent