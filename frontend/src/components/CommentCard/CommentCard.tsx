import React, {Dispatch} from "react";
import './commentCard.css';
import {imageStructure} from "../../utils/utils";
import {Link} from "react-router-dom";
import {Button, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {deleteComment} from "../../redux/actions/postActions";
import {getPostsOfFollowing} from "../../redux/actions/userActions";

interface CommentCardProps {
    userId: string
    name: string
    avatar: imageStructure
    comment: string
    commentId: string
    postId: string
    isAccount: boolean
}

export const CommentCard = (props: CommentCardProps) => {
    const {comment, commentId, postId, avatar, userId, name, isAccount} = props;
    const {user} = useSelector((state: RootStateOrAny) => state?.user);
    const dispatch: Dispatch<any> = useDispatch();

    function deleteCommentHandler() {
        dispatch(deleteComment(postId, commentId));
        if (isAccount) {

        } else {
            dispatch(getPostsOfFollowing())
        }
    }

    return (
        <>
            <div className={"commentUser"}>
                <Link to={`/user/${userId}`}>
                    <img src={avatar.url} alt={name}/>
                    <Typography style={{minWidth: '6vmax'}}>{name}</Typography>
                </Link>
                <Typography>{comment}</Typography>
                {(isAccount || userId === user?._id) && (
                    <Button onClick={deleteCommentHandler}>
                        <Delete/>
                    </Button>
                )}
            </div>
        </>
    )
}

export default CommentCard;
