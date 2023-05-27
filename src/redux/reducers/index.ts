import { combineReducers } from "redux";
import userReducer from "./userReducer";
import noteReducer from "./noteReducer";
import oauthClientsReducer from "./oauthClientReducer";

export const rootReducer = combineReducers({
    userStore: userReducer,
    noteStore: noteReducer,
    oauthClientStore: oauthClientsReducer,
});