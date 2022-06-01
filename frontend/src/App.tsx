import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;
