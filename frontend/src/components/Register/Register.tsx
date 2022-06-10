import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {userRegistrationObj} from "../../utils/utils";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../../redux/actions/userActions";
import {Avatar, Button, Typography} from "@mui/material";
import './register.css';

export const Register = () => {
    const initialState: userRegistrationObj = {
        email: '',
        password: '',
        avatar: "",
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
        user.avatar = state.avatar;
        dispatch(register(user));
        navigate("/account");
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setState({...state, [e.target.name]: e.target.value})
    }

    function imageHandler(e: any) {
        const file = e.target.files[0];
        const Reader: FileReader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setState({...state, avatar: Reader.result});
            }
        }
    }

    return (
        <>
            <div className={"register"}>
                <form className={"registerForm"} onSubmit={handleRegistration}>
                    <Typography variant={"h3"} style={{padding: '2vmax'}}>theSocial | Register</Typography>
                    <Avatar src={state.avatar as string} alt={"Post " + state.name} sx={{height: '10vmax', width: "10vmax"}}
                    />
                    <input onChange={imageHandler} accept={"image/*"} type={"file"}/>
                    <input className={"registerInputs"} placeholder={"Name"} type={"text"} name={"name"} required={true}
                           onChange={handleChange} value={state.name}/>
                    <input placeholder={"Email Address"} className={"registerInputs"} type={"email"} name={"email"}
                           required={true} onChange={handleChange} value={state.email}/>
                    <input placeholder={"Password"} className={"registerInputs"} type={"password"} name={"password"}
                           required={true} onChange={handleChange} value={state.password}/>
                    <Button type={"submit"}>Register</Button>
                    <Link to={"/"}>Already a user? Login Here</Link>
                </form>
            </div>
        </>
    )
}

export default Register;
