import React, {ChangeEvent, Dispatch, SyntheticEvent, useEffect, useState} from "react";
import './createPost.css';
import {Button, Typography} from "@mui/material";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {createPost} from "../../redux/actions/postActions";
import {CLEAR_ERRORS} from "../../redux/constants/userConstants";
import {CLEAR_MESSAGE} from "../../redux/constants/postConstants";

export const CreatePost = () => {
    const [image, setPost] = useState<string | ArrayBuffer | null>(null);
    const [caption, setCaption] = useState<string>("");
    const {message, loading, error} = useSelector((state: RootStateOrAny) => state?.post);
    const dispatch: Dispatch<any> = useDispatch();

    function imageHandler(e: any) {
        const file = e.target.files[0];
        const Reader: FileReader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setPost(Reader.result);
            }
        }
    }

    function createPostHandler(e: SyntheticEvent) {
        e.preventDefault();
        dispatch(createPost(caption, image))
    }

    useEffect(() => {
        if (error) {
            dispatch({type: CLEAR_ERRORS});
        }
        if (message) {
            dispatch({type: CLEAR_MESSAGE});
        }
    }, [dispatch, error, message])

    return (
        <>
            <div className={"newPost"}>
                <form className={"newPostForm"} onSubmit={createPostHandler}>
                    <Typography variant={"h3"}>
                        Create Post
                    </Typography>
                    {image && <img src={image as string} alt={caption}/>}
                    <input onChange={imageHandler} type={"file"} accept={"image/*"}/>
                    <input type={"text"} value={caption}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)}
                           placeholder={"Caption"}/>
                    <Button disabled={loading} type={"submit"}>Post</Button>
                </form>
            </div>
        </>
    )
}

export default CreatePost;
