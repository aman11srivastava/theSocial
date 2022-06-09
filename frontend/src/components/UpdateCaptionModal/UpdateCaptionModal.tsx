import React, {ChangeEvent, Dispatch, SyntheticEvent, useState} from "react";
import {Button, Dialog, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {getMyPosts, updateCaption} from "../../redux/actions/postActions";

interface UpdateCaptionModalProps {
    open: boolean
    setOpen: (value: boolean) => void;
    postId: string
    prevCaption: string
}

export const UpdateCaptionModal = (props: UpdateCaptionModalProps) => {
    const {setOpen, open, postId, prevCaption} = props;
    const [caption, setCaption] = useState<string>(prevCaption);
    const dispatch: Dispatch<any> = useDispatch();

    function updateCaptionHandler(e: ChangeEvent<HTMLInputElement>) {
        setCaption(e.target.value);
    }

    async function updateCaptionSubmitHandler(e: SyntheticEvent) {
        e.preventDefault();
        await dispatch(updateCaption(postId, caption));
        await setCaption("");
        setOpen(false);
        dispatch(getMyPosts());
    }

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(!open)}>
                <div className={"DialogBox"}>
                    <Typography variant={"h4"}>Update Caption</Typography>
                    <form onSubmit={updateCaptionSubmitHandler} className={"commentForm"}>
                        <input type={"text"} required={true} placeholder={"Update Caption"}
                               onChange={updateCaptionHandler} value={caption}/>
                        <Button type={"submit"}>
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default UpdateCaptionModal;
