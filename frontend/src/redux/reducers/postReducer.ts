import {userReducerActionType} from "../../utils/utils";
import {
    ADD_COMMENT_FAIL,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
    CLEAR_MESSAGE,
    LIKE_POST_FAIL,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS
} from "../constants/postConstants";
import {CLEAR_ERRORS} from "../constants/userConstants";

export const likePostReducer = (state = {}, action: userReducerActionType) => {
    switch (action.type) {
        case LIKE_POST_REQUEST:
        case ADD_COMMENT_REQUEST:
            return {
                loading: true
            }
        case LIKE_POST_SUCCESS:
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case LIKE_POST_FAIL:
        case ADD_COMMENT_FAIL:
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
