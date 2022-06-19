import {Dispatch} from "redux";
import {
    ALL_USERS_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    DELETE_PROFILE_FAIL,
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GET_USER_PROFILE_FAIL, GET_USER_PROFILE_REQUEST, GET_USER_PROFILE_SUCCESS,
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
import axios from "axios";
import {application_json_config, updateProfileObjType, userRegistrationObj} from "../../utils/utils";

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});
        const {data} = await axios.post('/api/login', {email, password}, application_json_config);
        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (err: any) {
        dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
    }
}

export const register = (user: userRegistrationObj) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: REGISTER_REQUEST});
        const {data} = await axios.post('/api/register', user, application_json_config);
        dispatch({type: REGISTER_SUCCESS, payload: data.user});
    } catch (err: any) {
        dispatch({type: REGISTER_FAIL, payload: err.response.data.message});
    }
}

export const loadUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios.get('/api/me');
        dispatch({type: LOAD_USER_SUCCESS, payload: data?.user});
    } catch (err: any) {
        dispatch({type: LOAD_USER_FAIL, payload: err?.response?.data?.message});
    }
}

export const getAllUsers = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: ALL_USERS_REQUEST});
        const {data} = await axios.get('/api/users');
        dispatch({type: ALL_USERS_SUCCESS, payload: data.users});
    } catch (err: any) {
        dispatch({type: ALL_USERS_FAIL, payload: err.response.data.message});
    }
}

export const getPostsOfFollowing = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: POST_OF_FOLLOWING_REQUEST});
        const {data} = await axios.get(`/api/posts`);
        dispatch({type: POST_OF_FOLLOWING_SUCCESS, payload: data?.posts});
    } catch (err: any) {
        dispatch({type: POST_OF_FOLLOWING_FAIL, payload: err?.response?.data?.message});
    }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LOGOUT_REQUEST});
        const {data} = await axios.get('/api/logout');
        dispatch({type: LOGOUT_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: LOGOUT_FAIL, payload: err?.response?.data?.message});
    }
}

export const deleteProfile = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: DELETE_PROFILE_REQUEST});
        const {data} = await axios.delete(`/api/delete/me`);
        dispatch({type: DELETE_PROFILE_SUCCESS, payload: data?.message})
    } catch (err: any) {
        dispatch({type: DELETE_PROFILE_FAIL, payload: err?.response?.data?.message});
    }
}

export const updateProfile = (user: updateProfileObjType) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: UPDATE_PROFILE_REQUEST});
        const {data} = await axios.put('/api/update/profile', user, application_json_config);
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: UPDATE_PROFILE_FAIL, payload: err?.response?.data?.message});
    }
}

export const updatePassword = (oldPassword: string, newPassword: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST});
        const {data} = await axios.put('/api/update/password', {oldPassword, newPassword}, application_json_config);
        dispatch({type: UPDATE_PASSWORD_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: UPDATE_PASSWORD_FAIL, payload: err?.response?.data?.message});
    }
}

export const forgotPassword = (email: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: FORGOT_PASSWORD_REQUEST});
        const {data} = await axios.post('/api/forgot/password', {email}, application_json_config);
        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: FORGOT_PASSWORD_FAIL, payload: err?.response?.data?.message});
    }
}

export const resetPassword = (token: string | undefined, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: RESET_PASSWORD_REQUEST});
        const {data} = await axios.put(`/api/password/reset/${token}`, {password}, application_json_config);
        dispatch({type: RESET_PASSWORD_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: RESET_PASSWORD_FAIL, payload: err?.response?.data?.message});
    }
}

export const getSingleUserPosts = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: USER_POSTS_REQUEST});
        const {data} = await axios.get(`/api/posts/user/${id}`);
        dispatch({type: USER_POSTS_SUCCESS, payload: data?.posts});
    } catch (err: any) {
        dispatch({type: USER_POSTS_FAIL, payload: err?.response?.data?.message});
    }
}

export const getSingleUserProfile = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: GET_USER_PROFILE_REQUEST});
        const {data} = await axios.get(`/api/user/${id}`);
        dispatch({type: GET_USER_PROFILE_SUCCESS, payload: data?.user});
    } catch (err: any) {
        dispatch({type: GET_USER_PROFILE_FAIL, payload: err?.response?.data?.message});
    }
}

export const followUnfollowUser = (id: string | undefined) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: FOLLOW_USER_REQUEST});
        const {data} = await axios.get(`/api/follow/${id}`);
        dispatch({type: FOLLOW_USER_SUCCESS, payload: data?.message});
    } catch (err: any) {
        dispatch({type: FOLLOW_USER_FAIL, payload: err?.response?.data?.message});
    }
}
