import React, {Dispatch, useEffect} from "react";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import AccountDetailsSection from "../Account/AccountDetailsSection/AccountDetailsSection";
import {getSingleUserPosts, getSingleUserProfile} from "../../redux/actions/userActions";
import {useParams} from "react-router-dom";
import {postStructureType} from "../../utils/utils";
import Post from "../Post/Post";
import {Typography} from "@mui/material";

export const UserProfile = () => {
    const {loading, user} = useSelector((state: RootStateOrAny) => state?.userProfile);
    const {posts} = useSelector((state: RootStateOrAny) => state?.userPosts);
    const dispatch: Dispatch<any> = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getSingleUserProfile(id));
            dispatch(getSingleUserPosts(id));
        }
    }, [dispatch])

    return (
        <>
            {loading ? <Loader color={"white"}/> :
                <>
                    <div className={"account"}>
                        <div className={"accountleft"}>
                            {
                                posts && posts.length > 0 ? posts.map((post: postStructureType) => (
                                    <Post key={post._id} isDelete={false} isAccount={false} postId={post._id}
                                          caption={post.caption} postImage={post.image?.url} likes={post.likes}
                                          comments={post.comments} ownerImage={post?.owner?.avatar?.url}
                                          ownerName={post.owner.name} ownerId={post?.owner?._id}
                                    />
                                )) : <Typography variant={"h4"}>No Posts yet!</Typography>
                            }
                        </div>
                        <div className={"accountright"}>
                            <AccountDetailsSection user={user} loading={loading} isUserPage={true}/>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UserProfile;
