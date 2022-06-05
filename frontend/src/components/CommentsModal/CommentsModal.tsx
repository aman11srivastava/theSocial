import React, {ChangeEvent, Dispatch, SyntheticEvent, useState} from 'react';
import {Button, Dialog, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {addComment} from "../../redux/actions/postActions";
import {getPostsOfFollowing} from "../../redux/actions/userActions";
import CommentCard from "../CommentCard/CommentCard";

interface CommentsModalProps {
    commentsToggle: boolean
    setCommentsToggle: (value: boolean) => void;
    postId: string
    isAccount: boolean
    comments: any[]
}

export const CommentsModal = (props: CommentsModalProps) => {
    const [comment, setComment] = useState<string>("");
    const {commentsToggle, setCommentsToggle, postId, isAccount, comments} = props;
    const dispatch: Dispatch<any> = useDispatch();

    function handleCommentChange(e: ChangeEvent<HTMLInputElement>): void {
        setComment(e.target.value);
    }

    async function handleFormSubmit(e: SyntheticEvent): Promise<void> {
        e.preventDefault();
        await dispatch(addComment(postId, comment));
        await setComment("");
        if (isAccount) {

        } else {
            dispatch(getPostsOfFollowing())
        }
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
                    {
                        comments.length > 0 ? comments.map(cardComment => (
                            <CommentCard isAccount={isAccount} key={cardComment?._id} comment={cardComment?.comment}
                                         commentId={cardComment?._id} postId={postId} name={cardComment?.user?.name}
                                         avatar={{
                                             url: cardComment?.user?.avatar?.url,
                                             public_id: cardComment?.user?.avatar?.public_id
                                         }} userId={cardComment?.user._id}/>
                        )) : <Typography>No comments yet</Typography>
                    }
                </div>
            </Dialog>
        </>
    )
}

export default CommentsModal;
