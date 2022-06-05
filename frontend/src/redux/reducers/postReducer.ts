import {userReducerActionType} from "../../utils/utils";
import {
    ADD_COMMENT_FAIL,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    CLEAR_MESSAGE, DELETE_COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS,
    LIKE_POST_FAIL,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS, MY_POSTS_FAIL, MY_POSTS_REQUEST, MY_POSTS_SUCCESS
} from "../constants/postConstants";
import {CLEAR_ERRORS} from "../constants/userConstants";

export const likePostReducer = (state = {}, action: userReducerActionType) => {
    switch (action.type) {
        case LIKE_POST_REQUEST:
        case ADD_COMMENT_REQUEST:
        case DELETE_COMMENT_REQUEST:
            return {
                loading: true
            }
        case LIKE_POST_SUCCESS:
        case ADD_COMMENT_SUCCESS:
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case LIKE_POST_FAIL:
        case ADD_COMMENT_FAIL:
        case DELETE_COMMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                error: null
            }
        case CLEAR_MESSAGE:
            return {
                message: null
            }
        default:
            return state
    }
}

export const myPostsReducer = (state = {posts: []}, action: userReducerActionType) => {
    switch (action.type) {
        case MY_POSTS_REQUEST:
            return {
                loading: true
            }
        case MY_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case MY_POSTS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                error: null
            }
        default:
            return state;
    }
}
