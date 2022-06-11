import React, {Dispatch, useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {loadUser} from "./redux/actions/userActions";
import Home from "./components/Home/Home";
import Account from "./components/Account/Account";
import CreatePost from "./components/CreatePost/CreatePost";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

function App() {
    const dispatch: Dispatch<any> = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])
    const {isAuthenticated} = useSelector((state: RootStateOrAny) => state?.user);

    return (
        <Router>
            {isAuthenticated && <Header/>}
            {/*<ProtectedRoute component={<Header/>}/>*/}
            <Routes>
                <Route path={"/"} element={isAuthenticated ? <Home/> : <Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/account"} element={isAuthenticated ? <Account/> : <Login/>}/>
                <Route path={"/newpost"} element={isAuthenticated ? <CreatePost/> : <Login/>}/>
                <Route path={"/update/profile"} element={isAuthenticated ? <UpdateProfile/> : <Login/>}/>
            </Routes>
        </Router>
    );
}

export default App;
