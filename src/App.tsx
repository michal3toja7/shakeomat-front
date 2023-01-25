import React from 'react';
import './App.css';
import DiscountApp from "./components/DiscountApp";
import {Route, Routes} from 'react-router-dom';
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/Login";
import {ThemeProvider} from "@mui/material";
import {muiTheme} from "./shared/styles/muiTheme";


function App() {
    const theme = muiTheme();
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/logowanie"
                           element={<Login/>}
                    />
                    <Route path="/" element={<PrivateRoute/>}>
                        <Route path="/" element={<DiscountApp/>}/>
                    </Route>
                </Routes>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
