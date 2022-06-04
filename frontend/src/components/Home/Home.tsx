import React, {Dispatch, useEffect} from "react";
import './home.css';
import User from "../User/User";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {postStructure, userStructure} from "../../utils/utils";
import {getAllUsers, getPostsOfFollowing} from "../../redux/actions/userActions";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import {Typography} from "@mui/material";

export const Home = () => {
    const {users} = useSelector((state: RootStateOrAny) => state?.allUsers);
    const {posts, loading, error} = useSelector((state: RootStateOrAny) => state?.postsOfFollowing);
    const dispatch: Dispatch<any> = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getPostsOfFollowing())
    }, [dispatch])

    return (
        <>
            <div className={"home"}>
                {loading ? <Loader color={"white"}/> : (
                    <div className={"homeleft"}>
                        {posts && posts.length > 0 ? posts.map((post: postStructure) => (
                            <Post caption={post.caption} postId={post.postId} comments={post.comments} isAccount={false}
                                  isDelete={false} likes={post.likes} ownerId={post.ownerId} ownerImage={post.ownerImage}
                                  ownerName={post.ownerName} postImage={post.postImage}
                            />
                        )) : <Typography align={"center"}>No posts yet</Typography>}
                    </div>
                )}


                <div className={"homeright"}>
                    {users && users.map((user: userStructure) => (
                        <User key={user._id} name={user.name} userId={user._id} avatar={user.avatar.url}/>))}
                </div>
            </div>

        </>
    )
}

export default Home;
