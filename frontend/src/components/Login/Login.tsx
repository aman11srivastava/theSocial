import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import './login.css';
import {Button, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions/userActions";

export const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogin(e: SyntheticEvent) {
        e.preventDefault();
        dispatch(login(email, password));
        alert("Login successful")
        navigate("account");
    }

    return (
        <>
            <div className={"login"}>
                <form className={"loginForm"} onSubmit={handleLogin}>
                    <Typography variant={"h3"} style={{padding: '2vmax'}}>theSocial | Login</Typography>
                    <input value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                           type={"email"} placeholder={"Email Address"} required={true}/>
                    <input value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                           type={"password"} placeholder={"Password"} required={true}/>
                    <Link to={"/forgot/password"}>Forgot Password?</Link>
                    <Button type={"submit"}>Login</Button>
                    <Link to={"/register"}>New User</Link>
                </form>
            </div>
        </>
    )
}

export default Login;
