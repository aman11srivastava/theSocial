import {Dispatch} from "redux";
import {
    ADD_COMMENT_FAIL,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS,
    DELETE_COMMENT_FAIL,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    LIKE_POST_FAIL,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    MY_POSTS_FAIL,
    MY_POSTS_REQUEST,
    MY_POSTS_SUCCESS
} from "../constants/postConstants";
import axios from "axios";

export const likePost = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LIKE_POST_REQUEST});
        const {data} = await axios.get(`/api/post/${id}`);
        dispatch({type: LIKE_POST_SUCCESS, payload: data.message});
    } catch (err: any) {
        dispatch({type: LIKE_POST_FAIL, payload: err?.response.data?.message});
    }
}

export const addComment = (id: string, comment: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ADD_COMMENT_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.put(`/api/post/comment/${id}`, {comment}, config);
        dispatch({type: ADD_COMMENT_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: ADD_COMMENT_FAIL, payload: err?.response?.data?.message});
    }
}

export const deleteComment = (postId: string, commentId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: DELETE_COMMENT_REQUEST});
        const {data} = await axios.delete(`/api/post/comment/${postId}`, {
            data: commentId
        });
        dispatch({type: DELETE_COMMENT_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: DELETE_COMMENT_FAIL, payload: err?.response?.data?.message});
    }
}

export const getMyPosts = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: MY_POSTS_REQUEST});
        const {data} = await axios.get('/api/my/posts');
        dispatch({type: MY_POSTS_SUCCESS, payload: data?.posts});
    } catch (err: any) {
        dispatch({type: MY_POSTS_FAIL, payload: err?.response?.data?.message});
    }
}

export const createPost = (caption: string, image: string | ArrayBuffer | null) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: CREATE_POST_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const post = {caption, image};
        const {data} = await axios.post(`/api/post/create`, post, config);
        dispatch({type: CREATE_POST_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: CREATE_POST_FAIL, payload: err?.response?.data?.message});
    }
}
