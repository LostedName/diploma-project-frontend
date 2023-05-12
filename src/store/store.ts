import { combineReducers, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { notesReducer } from "./notes-reducer";
import { appsReducer } from "./apps-reducer";

const rootReducer = combineReducers({
  notes: notesReducer,
  OAuthApps: appsReducer,
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
