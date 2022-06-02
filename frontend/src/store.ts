import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {allUsersReducer, userReducer} from "./redux/reducers/userReducer";

const reducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
