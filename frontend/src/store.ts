import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {allUsersReducer, postOfFollowingReducer, userReducer} from "./redux/reducers/userReducer";
import {likePostReducer, myPostsReducer} from "./redux/reducers/postReducer";

const reducer = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer,
    postsOfFollowing: postOfFollowingReducer,
    like: likePostReducer,
    myPosts: myPostsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
