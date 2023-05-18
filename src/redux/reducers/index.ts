import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

export const rootReducer = combineReducers({
    userStore: userReducer,
    adminStore: adminReducer,
    postStore: postReducer,
});