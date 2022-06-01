import {Dispatch} from "redux";
import {LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS} from "../constants/userConstants";
import axios from "axios";

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST});
        const config = {headers: {"Content-Type": "application/json"}};
        const {data} = await axios.post('/api/login', {email, password}, config);
        dispatch({type: LOGIN_SUCCESS, payload: data.user});
    }catch (err: any) {
        dispatch({type: LOGIN_FAIL, payload: err.response.data.message});
    }
}
