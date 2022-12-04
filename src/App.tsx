import React from 'react';
import './App.css';
import NavBarComponent from "./components/siteBase/NavBarComponent";
import ControlPanelComponent from "./components/siteBase/controlPanelComponent/ControlPanelComponent";

function App() {
    return (
        <React.Fragment>
            <NavBarComponent/>
            <ControlPanelComponent/>
        </React.Fragment>
    );
}

export default App;
