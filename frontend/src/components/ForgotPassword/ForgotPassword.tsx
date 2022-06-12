import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import './forgotPassword.css';
import {Button, Typography} from "@mui/material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "../../redux/actions/userActions";
import {CLEAR_MESSAGE} from "../../redux/constants/postConstants";
import {CLEAR_ERRORS} from "../../redux/constants/userConstants";

export const ForgotPassword = () => {
    const [email, setEmail] = useState<string>("");
    const dispatch: Dispatch<any> = useDispatch();
    const {loading, error, message} = useSelector((state: RootStateOrAny) => state?.user);

    function forgotPasswordSubmitHandler(e: SyntheticEvent) {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if (message) {
            alert(message);
            dispatch({type: CLEAR_MESSAGE});
        }
        if (error) {
            alert(error)
            dispatch({type: CLEAR_ERRORS});

        }
    }, [dispatch, error, message])

    return (
        <>
            <div className={"forgotPassword"}>
                <form className={"forgotPasswordForm"} onSubmit={forgotPasswordSubmitHandler}>
                    <Typography variant={"h3"} style={{padding: '2vmax'}}>
                        theSocial | Forgot password
                    </Typography>
                    <input className={"forgotPasswordInputs"} value={email} type={"email"} required={true}
                           placeholder={"Email Address"}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                    <Button disabled={loading} type={"submit"}>Generate Reset Link</Button>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword;
