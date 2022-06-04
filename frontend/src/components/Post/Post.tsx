import React, {useState} from "react";
import './post.css';
import {Avatar, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ChatBubbleOutline, DeleteOutline, Favorite, FavoriteBorder, MoreVert} from "@mui/icons-material";
import {postStructure} from "../../utils/utils";

interface PostProps extends postStructure {
    isDelete: boolean
    isAccount: boolean
}

export const Post = (props: PostProps) => {
    const {isAccount, isDelete, likes, ownerId, ownerImage, postImage, postId, ownerName, caption} = props;
    const [liked, setLiked] = useState<boolean>(false);

    function likePostHandler() {
        setLiked(!liked);
    }

    return (
        <>
            <div className={"post"}>
                <div className="postHeader">
                    {isAccount && <Button><MoreVert/></Button>}
                </div>
                <img src={postImage} alt={postId}/>
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
                <button style={{
                    border: "none",
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    margin: '1vmax 2vmax'
                }}>
                    <Typography>{likes.length} likes</Typography>
                </button>
                <div className="postFooter">
                    <Button onClick={likePostHandler}>
                        {liked ? <Favorite style={{color: "#f0225f"}}/> : <FavoriteBorder/>}
                    </Button>
                    <Button>
                        <ChatBubbleOutline/>
                    </Button>
                    {isDelete && <Button>
                        <DeleteOutline/>
                    </Button>
                    }
                </div>
            </div>
        </>
    )
}

export default Post;
