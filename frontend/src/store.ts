import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {allUsersReducer, postOfFollowingReducer, userReducer} from "./redux/reducers/userReducer";
import {myPostsReducer, postReducer} from "./redux/reducers/postReducer";

const reducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer,
    postsOfFollowing: postOfFollowingReducer,
    post: postReducer,
    myPosts: myPostsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
