import React from "react";
import style from './NavBar.module.css'


type NavBarProps = {}

const NavBar: React.FC<NavBarProps> = () => {

    return (
        <nav className={`${style["nav-bar"]} ${style["nav-bar-container"]}`}>
            <div className={style["logo-container"]}>
            </div>

        </nav>
    )
}

export default NavBar