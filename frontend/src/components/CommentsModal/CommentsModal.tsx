import React, {ChangeEvent, Dispatch, SyntheticEvent, useState} from 'react';
import {Button, Dialog, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {addComment} from "../../redux/actions/postActions";

interface CommentsModalProps {
    commentsToggle: boolean
    setCommentsToggle: (value: boolean) => void;
    postId: string
}

export const CommentsModal = (props: CommentsModalProps) => {
    const [comment, setComment] = useState<string>("");
    const {commentsToggle, setCommentsToggle, postId} = props;
    const dispatch: Dispatch<any> = useDispatch();

    function handleCommentChange(e: ChangeEvent<HTMLInputElement>): void {
        setComment(e.target.value);
    }

    function handleFormSubmit(e: SyntheticEvent): void {
        e.preventDefault();
        dispatch(addComment(postId, comment));
        setComment("");
    }

    return (
        <>
            <Dialog open={commentsToggle} onClose={() => setCommentsToggle(!commentsToggle)}>
                <div className={"DialogBox"}>
                    <Typography variant={"h4"}>Comments</Typography>
                    <form onSubmit={handleFormSubmit} className={"commentForm"}>
                        <input required={true} type={"text"} value={comment} placeholder={"Add comment"}
                               onChange={handleCommentChange}/>
                        <Button type={"submit"}>
                            Add
                        </Button>
                    </form>
                </div>
            </Dialog>
        </>
    )
}

export default CommentsModal;
