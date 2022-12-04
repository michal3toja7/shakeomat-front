import React from 'react';
import './App.css';
import NavBarComponent from "./components/siteBase/NavBarComponent";
import ControlPanelComponent from "./components/siteBase/controlPanelComponent/ControlPanelComponent";
import DiscountContainerComponent from "./components/discounts/DiscountContainerComponent";

function App() {
    return (
        <React.Fragment>
            <NavBarComponent/>
            <DiscountContainerComponent/>
            <ControlPanelComponent/>
        </React.Fragment>
    );
}

export default App;
