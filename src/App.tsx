import React from 'react';
import './App.css';
import DiscountApp from "./components/DiscountApp";
import {Route, Routes} from 'react-router-dom';

function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route path="/" element={<DiscountApp/>}/>
            </Routes>

        </React.Fragment>
    );
}

export default App;
