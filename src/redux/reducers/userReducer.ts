import { TokenType } from './../../services/jwt';
import { deleteToken } from "../../services/jwt";
import { UserAction, UserActionTypes, UserState } from "../../types/User";
import { isNil } from 'lodash';
 
const initialState: UserState = {
  isAppLoading: true,
  isAuth: false,
  user: null,
  states: {
    isResendConfirmEmailAvailable: false,
    isVerifySignUpAvailable: false,
    isTwoFactorAuthAvailable: false,
    isSignUpConfirmedAvailable: false,
    isSignUpConfirmationErrorAvailable: false,
  },
  errors: {
    resetPassword: false,
    confirmSignUp: false,
  },
};

const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.SET_AUTHORIZATION:
            return {...state, isAuth: action.payload};
        case UserActionTypes.SET_RESEND_VERIFY_SIGN_UP_AVAILABLE:
            return {...state, states: {...state.states, isResendConfirmEmailAvailable: action.payload}};
        case UserActionTypes.SET_VERIFY_SIGN_UP_AVAILABLE:
            return {...state, states: {...state.states, isVerifySignUpAvailable: action.payload}};
        case UserActionTypes.SET_SIGN_UP_CONFIRMED_AVAILABLE:
            return {...state, states: {...state.states, isSignUpConfirmedAvailable: action.payload}};
        case UserActionTypes.SET_SIGN_UP_CONFIRMATION_ERROR_AVAILABLE:
            return {...state, states: {...state.states, isSignUpConfirmationErrorAvailable: action.payload}};
        case UserActionTypes.SET_TWO_FACTOR_AUTH_AVAILABLE:
            return {...state, states: {...state.states, isTwoFactorAuthAvailable: action.payload}};
        case UserActionTypes.SET_USER_DATA:
            return {
                ...state,
                isAuth: true,
                user: { ...action.payload },
            };
        case UserActionTypes.UPDATE_PROFILE_DATA:
            if (isNil(state.user)) {
                return state;
            }
            state.user.firstname = action.payload.firstName;
            state.user.lastname = action.payload.lastName;
            state.user.avatarUrl = action.payload.avatarUrl;
            return { ...state };

        case UserActionTypes.LOGOUT_USER:
            deleteToken(TokenType.Access);
            deleteToken(TokenType.Refresh);
            return { ...initialState, isAppLoading: false };
        case UserActionTypes.SET_APP_LOADING:
            return {...state, isAppLoading: action.payload};
        default:
            return state;
    }
};

export default userReducer;