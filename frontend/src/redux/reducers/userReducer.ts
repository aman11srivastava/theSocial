import {
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../constants/userConstants";
import {userReducerActionType, userStructure} from "../../utils/utils";

interface initialStateType {
    user: userStructure
    isAuthenticated: boolean
}

const initialState: initialStateType = {
    isAuthenticated: false,
    user: {}
}
export const userReducer = (state: initialStateType = initialState, action: userReducerActionType) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        default:
            return state;
    }
}
