import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {userRegistrationObj} from "../../utils/utils";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../../redux/actions/userActions";
import {Button, Typography} from "@mui/material";

export const Register = () => {
    const initialState: userRegistrationObj = {
        email: '',
        password: '',
        // image: {
        //     url: '',
        //     public_id: '',
        // },
        name: ""
    }
    const [state, setState] = useState<userRegistrationObj>(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleRegistration(e: SyntheticEvent) {
        e.preventDefault();
        const user: userRegistrationObj = initialState;
        user.name = state.name;
        user.email = state.email;
        user.password = state.password;
        dispatch(register(user));
        navigate("/account");
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setState({...state, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className={"login"}>
                <form className={"loginForm"} onSubmit={handleRegistration}>
                    <Typography variant={"h3"} style={{padding: '2vmax'}}>theSocial | Register</Typography>
                    <input placeholder={"Name"} type={"text"} name={"name"} required={true} onChange={handleChange}
                           value={state.name}/>
                    <input placeholder={"Email Address"} type={"email"} name={"email"} required={true}
                           onChange={handleChange} value={state.email}/>
                    <input placeholder={"Password"} type={"password"} name={"password"} required={true}
                           onChange={handleChange}
                           value={state.password}/>
                    <Button type={"submit"}>Register</Button>
                    <Link to={"/"}>Already a user? Login Here</Link>
                </form>
            </div>
        </>
    )
}

export default Register;
