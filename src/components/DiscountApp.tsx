import NavBarComponent from "./siteBase/NavBarComponent";
import DiscountContainerComponent from "./discounts/DiscountContainerComponent";
import ControlPanelComponent from "./siteBase/controlPanelComponent/ControlPanelComponent";
import React from "react";


type Props = {}

const DiscountApp: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <NavBarComponent/>
            <DiscountContainerComponent/>
            <ControlPanelComponent/>
        </React.Fragment>
    )
}

export default DiscountApp

