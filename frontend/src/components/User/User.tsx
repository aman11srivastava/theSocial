import React from "react";
import {Link} from "react-router-dom";
import {Typography} from "@mui/material";

interface UserProps {
    name: string
    userId: string
    avatar: string
}

export const User = ({userId, avatar, name}: UserProps) => {
    return (
        <>
            <Link to={`/user/${userId}`} className={"homeUser"}>
                <img src={avatar} alt={name}/>
                <Typography>{name}</Typography>
            </Link>
        </>
    )
}

export default User;
