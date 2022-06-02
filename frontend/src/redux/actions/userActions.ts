import {Dispatch} from "redux";
import {
    ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS,
    LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "../constants/userConstants";
import axios from "axios";
import {userRegistrationObj} from "../../utils/utils";

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.post('/api/login', {email, password}, config);
        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    } catch (err: any) {
        dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
    }
}

export const register = (user: userRegistrationObj) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: REGISTER_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        // const config = {headers: {"Content-Type": "multipart/form-data"}};
        const {data} = await axios.post('/api/register', user, config);
        dispatch({type: REGISTER_SUCCESS, payload: data.user});
    } catch (err: any) {
        dispatch({type: REGISTER_FAIL, payload: err.response.data.message});
    }
}

export const loadUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST});
        const {data} = await axios.get('/api/me');
        dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
    } catch (err: any) {
        dispatch({type: LOAD_USER_FAIL, payload: err.response.data.message});
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
