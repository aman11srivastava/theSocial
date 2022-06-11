import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import './updateProfile.css';
import {updateProfileObjType} from "../../utils/utils";
import {Avatar, Button, Typography} from "@mui/material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {CLEAR_ERRORS} from "../../redux/constants/userConstants";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {loadUser, updateProfile} from "../../redux/actions/userActions";

export const UpdateProfile = () => {
    const {user, loading, error} = useSelector((state: RootStateOrAny) => state?.user);
    const initialState: updateProfileObjType = {
        name: user?.name,
        email: user?.email,
        avatar: "",
        avatarPrev: user?.avatar?.url
    }
    const [state, setState] = useState<updateProfileObjType>(initialState);
    const dispatch: Dispatch<any> = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setState({...state, [e.target.name]: e.target.value});
    }

    function imageHandler(e: any) {
        const file = e.target.files[0];
        const Reader: FileReader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setState({...state, avatar: Reader.result, avatarPrev: Reader.result});
            }
        }
    }

    async function formSubmitHandler(e: SyntheticEvent) {
        e.preventDefault();
        const user: updateProfileObjType = initialState;
        user.name = state.name;
        user.email = state.email;
        user.avatar = state.avatar;
        await dispatch(updateProfile(user));
        await dispatch(loadUser());
        navigate('/')
    }

    useEffect(() => {
        if (error) {
            dispatch({type: CLEAR_ERRORS});
        }
    }, [error, dispatch])

    return (
        <>
            <div className={"updateProfile"}>
                <form className={"updateProfileForm"} onSubmit={formSubmitHandler}>
                    <Typography variant={"h3"} style={{padding: "2vmax"}}>theSocial | Update Profile</Typography>
                    <Avatar src={state.avatarPrev as string} alt={"User"} sx={{ height: "10vmax", width: "10vmax" }}/>
                    <input onChange={imageHandler} accept={"image/*"} type={"file"}/>
                    <input type={"text"} value={state.name} name={"name"} onChange={handleChange}
                           className={"updateProfileInputs"} placeholder={"Name"}/>
                    <input type={"text"} value={state.email} name={"email"} onChange={handleChange}
                           className={"updateProfileInputs"} placeholder={"Email"}/>
                    <Button disabled={loading} type={"submit"}>
                        Update
                    </Button>
                </form>
            </div>
        </>
    )
}

export default UpdateProfile;
