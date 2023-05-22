import { combineReducers } from "redux";
import userReducer from "./userReducer";
import noteReducer from "./noteReducer";

export const rootReducer = combineReducers({
    userStore: userReducer,
    noteStore: noteReducer,
});