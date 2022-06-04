import {Dispatch} from "redux";
import {LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS} from "../constants/postConstants";
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
