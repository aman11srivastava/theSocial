import React from 'react';
import {Dialog, Typography} from "@mui/material";
import {RootStateOrAny, useSelector} from "react-redux";
import User from "../../User/User";
import {userStructure} from "../../../utils/utils";

interface FollowersModalProps {
    open: boolean
    setOpen: (value: boolean) => void;
    field: string
    errorMessage: string
}

export const FollowInfoModal = (props: FollowersModalProps) => {
    const {user} = useSelector((state: RootStateOrAny) => state?.user);
    const {open, setOpen, field, errorMessage} = props;
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(!open)}>
                <div className={"DialogBox"}>
                    <Typography variant={"h4"}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                    </Typography>
                    {user && user[field].length > 0 ? user[field].map((f: userStructure) => (
                        <User key={f._id} name={f?.name} userId={f?._id}
                              avatar={f?.avatar?.url}/>
                    )) : (
                        <div className={"followInfoMessageContainer"}>
                            <Typography style={{margin: '2vmax'}}>{errorMessage}</Typography>
                        </div>
                    )
                    }
                </div>
            </Dialog>
        </>
    )
}

export default FollowInfoModal;
