import React, {Dispatch, useEffect, useState} from "react";
import './post.css';
import {Avatar, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder, MoreVert} from "@mui/icons-material";
import {postStructure} from "../../utils/utils";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getMyPosts, likePost} from "../../redux/actions/postActions";
import {Alert, Stack} from '@mui/material/';
import {CLEAR_MESSAGE} from "../../redux/constants/postConstants";
import {CLEAR_ERRORS} from "../../redux/constants/userConstants";
import {getPostsOfFollowing} from "../../redux/actions/userActions";
import LikesModal from "../LikesModal/LikesModal";
import CommentsModal from "../CommentsModal/CommentsModal";
import UpdateCaptionModal from "../UpdateCaptionModal/UpdateCaptionModal";

interface PostProps extends postStructure {
    isDelete: boolean
    isAccount: boolean
}

export const Post = (props: PostProps) => {
    const {isAccount, isDelete, likes, ownerId, ownerImage, postImage, postId, ownerName, caption, comments} = props;
    const [liked, setLiked] = useState<boolean>(false);
    const [alert, setAlert] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openUpdateCaptionModal, setOpenUpdateCaptionModal] = useState<boolean>(false);
    const [commentsToggle, setCommentsToggle] = useState<boolean>(false);
    const dispatch: Dispatch<any> = useDispatch();
    const {message, error} = useSelector((state: RootStateOrAny) => state?.post);
    const {user} = useSelector((state: RootStateOrAny) => state?.user);

    async function likePostHandler() {
        setLiked(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(getMyPosts())
        } else {
            dispatch(getPostsOfFollowing());
        }
        if (!alert) {
            setAlert(true);
        }
        setTimeout(() => {
            setAlert(false)
        }, 2000);
        dispatch({type: CLEAR_MESSAGE});
    }

    useEffect(() => {
        if (error) {
            dispatch({type: CLEAR_ERRORS});
        }
    }, [error, dispatch])

    useEffect(() => {
        likes.forEach(item => {
            if (item?._id.toString() === user?._id.toString()) {
                setLiked(true);
            }
        })
    }, [likes, user?._id])

    return (
        <>
            <div className={"post"}>
                <div className="postHeader">
                    {isAccount && <Button onClick={() => setOpenUpdateCaptionModal(!openUpdateCaptionModal)}><MoreVert/></Button>}
                </div>
                <img src={postImage} alt={"post image " + postId}/>
                <div className="postDetails">
                    <Avatar src={ownerImage} alt={ownerName} sx={{
                        height: '3vmax',
                        width: '3vmax'
                    }}/>
                    <Link to={`/user/${ownerId}`}>
                        <Typography fontWeight={700}>{ownerName}</Typography>
                    </Link>
                    <Typography fontWeight={100} color={"rgba(0, 0, 0, 0.582)"}
                                style={{alignSelf: 'center'}}>{caption}</Typography>
                </div>
                <button disabled={likes.length === 0} onClick={() => setOpen(!open)} style={{
                    border: "none",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    margin: '1vmax 2vmax'
                }}>
                    <Typography>{likes.length} {likes.length === 1 ? `like` : 'likes'}</Typography>
                </button>
                <div className="postFooter">
                    <Button onClick={likePostHandler}>
                        {liked ? <Favorite style={{color: "#f0225f"}}/> : <FavoriteBorder/>}
                    </Button>
                    <Button onClick={() => setCommentsToggle(!commentsToggle)}>
                        <ChatBubbleOutline/>
                    </Button>
                    {isDelete && <Button>
                        <DeleteOutline/>
                    </Button>
                    }
                </div>
                <LikesModal likes={likes} open={open} setOpen={setOpen}/>
                <CommentsModal comments={comments} isAccount={isAccount} postId={postId} commentsToggle={commentsToggle} setCommentsToggle={setCommentsToggle}/>
                <UpdateCaptionModal prevCaption={caption} postId={postId} open={openUpdateCaptionModal} setOpen={setOpenUpdateCaptionModal}/>
            </div>
            {alert && <Stack sx={{width: '100%'}} spacing={2}>
                <Alert severity="success">{message}</Alert>
            </Stack>}
        </>
    )
}

export default Post;
