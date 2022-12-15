import React from 'react';
import './App.css';
import DiscountApp from "./components/DiscountApp";
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/Login";

function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/logowanie"
                       element={<Login/>}
                />
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<DiscountApp/>}/>
                </Route>
            </Routes>

        </React.Fragment>
    );
}

export default App;
