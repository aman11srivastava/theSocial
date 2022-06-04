import {userReducerActionType} from "../../utils/utils";
import {CLEAR_MESSAGE, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS} from "../constants/postConstants";
import {CLEAR_ERRORS} from "../constants/userConstants";

export const likePostReducer = (state = {}, action: userReducerActionType) => {
    switch (action.type) {
        case LIKE_POST_REQUEST:
            return {
                loading: true
            }
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case LIKE_POST_FAIL:
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
