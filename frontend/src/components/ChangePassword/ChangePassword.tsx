import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import './changePassword.css';
import {Button, Typography} from "@mui/material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {updatePassword} from "../../redux/actions/userActions";
import {CLEAR_MESSAGE} from "../../redux/constants/postConstants";
import {CLEAR_ERRORS} from "../../redux/constants/userConstants";

export const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const {message, loading, error} = useSelector((state: RootStateOrAny) => state?.user);
    const dispatch: Dispatch<any> = useDispatch();

    async function formSubmitHandler(e: SyntheticEvent) {
        e.preventDefault();
        await dispatch(updatePassword(oldPassword, newPassword));
        // await navigate('/account')
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
    }, [dispatch, message, error])

    return (
        <>
            <div className={"updatePassword"}>
                <form className={"updatePasswordForm"} onSubmit={formSubmitHandler}>
                    <Typography variant={"h3"}>theSocial | Update Password</Typography>
                    <input className={"updatePasswordInputs"} placeholder={"Old Password"} required={true}
                           type={"password"} name={"oldPassword"} value={oldPassword}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}/>
                    <input className={"updatePasswordInputs"} placeholder={"New Password"} required={true}
                           type={"password"} name={"newPassword"} value={newPassword}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}/>
                    <Button disabled={loading} type={"submit"}>Update Password</Button>
                </form>
            </div>
        </>
    )
}

export default ChangePassword;
