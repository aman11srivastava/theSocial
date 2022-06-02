import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
            </Routes>
        </Router>
    );
}

export default App;
