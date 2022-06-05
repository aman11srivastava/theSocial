import React from "react";
import {Dialog, Typography} from "@mui/material";
import {userStructure} from "../../utils/utils";
import User from "../User/User";

interface LikesModalProps {
    likes: any[]
    open: boolean
    setOpen: (value: boolean) => void;
}

export const LikesModal = (props: LikesModalProps) => {
    const {open, setOpen, likes} = props;
    return (
        <>
            <Dialog open={open} onClose={() => setOpen(!open)}>
                <div className={"DialogBox"}>
                    <Typography variant={"h4"}>Liked by</Typography>
                    {likes.map((user: userStructure) => (
                        <User key={user._id} name={user.name} userId={user._id} avatar={user.avatar.url}/>
                    ))}
                </div>
            </Dialog>
        </>
    )
}

export default LikesModal;
