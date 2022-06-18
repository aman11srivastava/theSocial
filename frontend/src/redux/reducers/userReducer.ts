import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PROFILE_FAIL,
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS, GET_USER_PROFILE_FAIL,
    GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    POST_OF_FOLLOWING_FAIL,
    POST_OF_FOLLOWING_REQUEST,
    POST_OF_FOLLOWING_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    USER_POSTS_FAIL,
    USER_POSTS_REQUEST,
    USER_POSTS_SUCCESS
} from "../constants/userConstants";
import {userReducerActionType, userStructure} from "../../utils/utils";

interface initialStateType {
    user: userStructure
    isAuthenticated: boolean
}

const initialState: initialStateType = {
    isAuthenticated: false,
    user: {
        _id: "",
        name: "",
        email: "",
        avatar: {
            url: "",
            public_id: ""
        },
    }
}
export const userReducer = (state: initialStateType = initialState, action: userReducerActionType) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case LOAD_USER_REQUEST:
        case LOGOUT_REQUEST:
        case DELETE_PROFILE_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true
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
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                message: action.payload
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                message: action.payload
            }
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload
            }
        case DELETE_PROFILE_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case DELETE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: true
            }
        default:
            return state;
    }
}

export const allUsersReducer = (state: userStructure[] = [], action: userReducerActionType) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                users: []
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                users: []
            }
        default:
            return state;
    }
}

export const postOfFollowingReducer = (state = {}, action: userReducerActionType) => {
    switch (action.type) {
        case POST_OF_FOLLOWING_REQUEST:
            return {
                loading: true
            }
        case POST_OF_FOLLOWING_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case POST_OF_FOLLOWING_FAIL:
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
            return state
    }
}

export const userPostsReducer = (state = {}, action: userReducerActionType) => {
    switch (action.type) {
        case USER_POSTS_REQUEST:
            return {
                loading: true,
            }
        case USER_POSTS_SUCCESS:
            return {
                loading: false,
                posts: action.payload
            }
        case USER_POSTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const userProfileReducer = (state = {}, action: userReducerActionType) => {
    switch (action.type) {
        case GET_USER_PROFILE_REQUEST:
            return {
                loading: true,
            }
        case GET_USER_PROFILE_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case GET_USER_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
