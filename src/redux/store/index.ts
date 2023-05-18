import { rootReducer } from './../reducers';
import { createStore, applyMiddleware, AnyAction, CombinedState } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export type AppDispatch = typeof store.dispatch;
export type ThunkDispatchType = ThunkDispatch<CombinedState<RootState>, unknown, AnyAction>
export default store;