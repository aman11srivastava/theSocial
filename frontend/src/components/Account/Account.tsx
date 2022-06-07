import React, {Dispatch, useEffect} from 'react';
import './account.css'
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getMyPosts} from "../../redux/actions/postActions";
import Post from "../Post/Post";
import {postStructureType} from "../../utils/utils";
import Loader from "../Loader/Loader";
import {Typography} from "@mui/material";
import AccountDetailsSection from "./AccountDetailsSection/AccountDetailsSection";

export const Account = () => {
    const {posts, loading} = useSelector((state: RootStateOrAny) => state?.myPosts);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(getMyPosts())
    }, [dispatch])

    return (
        <>
            {
                loading ? <Loader color={"white"}/> :
                    <div className={"account"}>
                        <div className={"accountleft"}>
                            {
                                posts && posts.length > 0 ? posts.map((post: postStructureType) => (
                                    <Post key={post._id} isDelete={true} isAccount={true} postId={post._id}
                                          caption={post.caption}
                                          postImage={post.image?.url} likes={post.likes} comments={post.comments}
                                          ownerImage={post?.owner?.avatar?.url} ownerName={post.owner.name}
                                          ownerId={post?.owner?._id}
                                    />)) : <Typography variant={"h4"}>No Posts yet!</Typography>
                            }
                        </div>

                        <div className={"accountright"}>
                            <AccountDetailsSection/>
                        </div>
                    </div>
            }
        </>
    )
}

export default Account;
