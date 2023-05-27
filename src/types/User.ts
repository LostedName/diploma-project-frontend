export enum UserActionTypes {
    SET_AUTHORIZATION="SET_AUTHORIZATION",
    SET_RESEND_VERIFY_SIGN_UP_AVAILABLE="SET_RESEND_VERIFY_SIGN_UP_AVAILABLE",
    SET_SIGN_UP_CONFIRMED_AVAILABLE="SET_SIGN_UP_CONFIRMED_AVAILABLE",
    SET_SIGN_UP_CONFIRMATION_ERROR_AVAILABLE="SET_SIGN_UP_CONFIRMATION_ERROR_AVAILABLE",
    SET_TWO_FACTOR_AUTH_AVAILABLE="SET_TWO_FACTOR_AUTH_AVAILABLE",
    SET_VERIFY_SIGN_UP_AVAILABLE="SET_VERIFY_SIGN_UP_AVAILABLE",
    SET_VERIFY_SIGN_UP_ERROR="SET_SIGN_UP_ERROR",
    SET_RESET_PASSWORD_ERROR="SET_RESET_PASSWORD_ERROR",

    SET_USER_DATA="SET_USER_DATA",
    UPDATE_PROFILE_DATA="UPDATE_PROFILE_DATA",
    LOGOUT_USER="LOGOUT_USER",
    SET_APP_LOADING="SET_APP_LOADING",
    SET_USER_ERROR="SET_USER_ERROR"
}

export interface SetResetPasswordErrorAction {
    type: UserActionTypes.SET_RESET_PASSWORD_ERROR;
    payload: boolean;
}

export interface SetVerifySignUpErrorAction {
    type: UserActionTypes.SET_VERIFY_SIGN_UP_ERROR;
    payload: boolean;
}

export interface SetAuthorizationErrorAction {
    type: UserActionTypes.SET_AUTHORIZATION;
    payload: boolean;
}

export interface SetResendVerifySignUpAvailableAction {
    type: UserActionTypes.SET_RESEND_VERIFY_SIGN_UP_AVAILABLE;
    payload: boolean;
}

export interface SetVerifySignUpAvailableAction {
    type: UserActionTypes.SET_VERIFY_SIGN_UP_AVAILABLE;
    payload: boolean;
}

export interface SetSignUpConfirmedAvailableAction {
    type: UserActionTypes.SET_SIGN_UP_CONFIRMED_AVAILABLE;
    payload: boolean;
}
export interface SetSignUpConfirmationErrorAvailableAction {
    type: UserActionTypes.SET_SIGN_UP_CONFIRMATION_ERROR_AVAILABLE;
    payload: boolean;
}
export interface SetTwoFactorAuthAvailableAvailableAction {
    type: UserActionTypes.SET_TWO_FACTOR_AUTH_AVAILABLE;
    payload: boolean;
}



export interface SetUserDataAction {
    type: UserActionTypes.SET_USER_DATA;
    payload: UserType;
}

export interface UpdateProfileDataAction {
    type: UserActionTypes.UPDATE_PROFILE_DATA;
    payload: UpdateProfileDto;
}

export interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER;
}

export interface AppLoadingAction {
    type: UserActionTypes.SET_APP_LOADING,
    payload: boolean,
}
export interface SetUserErrorAction {
    type: UserActionTypes.SET_USER_ERROR,
    payload: string,
}

export type UserAction = SetResetPasswordErrorAction |
                        SetVerifySignUpErrorAction |
                        SetAuthorizationErrorAction |
                        SetResendVerifySignUpAvailableAction |
                        SetVerifySignUpAvailableAction |
                        SetSignUpConfirmedAvailableAction |
                        SetSignUpConfirmationErrorAvailableAction |
                        SetTwoFactorAuthAvailableAvailableAction |
                        SetUserDataAction |
                        UpdateProfileDataAction |
                        LogoutUserAction | 
                        AppLoadingAction | 
                        SetUserErrorAction;

export interface UserType {
    id: number,
    email: string,
    avatarUrl?: string,
    firstname: string,
    lastname: string,
    createdAt: string,
}

export interface UpdateProfileDto {firstName: string, lastName: string, avatarUrl: string}

export interface EditProfileType {
    firstname: string,
    lastname: string,
    avatarUrl: string | null,
}

export interface UserErrorsType {
    resetPassword: boolean,
    confirmSignUp: boolean,
}

export interface UserStates {
    isResendConfirmEmailAvailable: boolean;
    isSignUpConfirmedAvailable: boolean;
    isSignUpConfirmationErrorAvailable: boolean;
    isTwoFactorAuthAvailable: boolean;
    isVerifySignUpAvailable: boolean;
}

export interface UserState {
    isAuth: boolean;
    isAppLoading: boolean;
    user: UserType | null;
    states: UserStates;
    errors: UserErrorsType;
}