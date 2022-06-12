import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import './resetPassword.css';
import {Button, Typography} from "@mui/material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../../redux/actions/userActions";
import {Link, NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {CLEAR_MESSAGE} from "../../redux/constants/postConstants";
import {CLEAR_ERRORS} from "../../redux/constants/userConstants";

export const ResetPassword = () => {
    const [password, setPassword] = useState<string>("");
    const {loading, message, error} = useSelector((state: RootStateOrAny) => state?.user);
    const dispatch: Dispatch<any> = useDispatch();
    const {token} = useParams();
    const navigate: NavigateFunction = useNavigate();

    function submitHandler(e: SyntheticEvent) {
        e.preventDefault();
        dispatch(resetPassword(token, password));
    }

    useEffect(() => {
        if (message) {
            alert(message);
            dispatch({type: CLEAR_MESSAGE});
            navigate('/')
        }
        if (error) {
            alert(error)
            dispatch({type: CLEAR_ERRORS});
        }
    }, [dispatch, error, message])


    return (
        <>
            <div className={"resetPassword"}>
                <form className={"resetPasswordForm"} onSubmit={submitHandler}>
                    <Typography variant={"h3"} style={{padding: '2vmax'}}>
                        theSocial | Reset Password
                    </Typography>
                    <input type={"password"} value={password} className={"resetPasswordInputs"} placeholder={"Password"}
                           required={true}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                    <Link to={"/forgot/password"}>
                        <Typography>Generate New Reset Link</Typography>
                    </Link>
                    <Button disabled={loading} type={"submit"}>Reset Password</Button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword;
