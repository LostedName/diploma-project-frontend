export enum UserActionTypes {
    SET_USER_DATA="SET_USER_DATA",
    SET_FOREIGN_USER_DATA="SET_FOREIGN_USER_DATA",
    LOGOUT_USER="LOGOUT_USER",
    SET_APP_LOADING="SET_APP_LOADING",
    SET_FOREIGN_USER_LOADING="SET_FOREIGN_USER_LOADING",
    SET_USER_ERROR="SET_USER_ERROR",
    SET_IS_FOLLOWED="SET_IS_FOLLOWED",
    SET_USER_FOLLOWS="SET_USER_FOLLOWS",
    SET_IS_FOLLOWED_ON_SUBS="SET_IS_FOLLOWED_ON_SUBS"
}

export interface SetUserDataAction {
    type: UserActionTypes.SET_USER_DATA;
    payload: UserType;
}
export interface SetForeignUserDataAction {
    type: UserActionTypes.SET_FOREIGN_USER_DATA;
    payload: ForeignUserType;
}
export interface SetIsFollowedAction {
    type: UserActionTypes.SET_IS_FOLLOWED;
    payload: boolean;
}
export interface SetIsFollowedOnSubsAction {
    type: UserActionTypes.SET_IS_FOLLOWED_ON_SUBS;
    payload: { isFollowed: boolean, userId: number };
}
export interface LogoutUserAction {
    type: UserActionTypes.LOGOUT_USER;
}

export interface AppLoadingAction {
    type: UserActionTypes.SET_APP_LOADING,
    payload: boolean,
}
export interface ForeignUserLoadingAction {
    type: UserActionTypes.SET_FOREIGN_USER_LOADING,
    payload: boolean,
}
export interface SetUserFollowAction {
    type: UserActionTypes.SET_USER_FOLLOWS,
    payload: FollowType[],
}
export interface SetUserErrorAction {
    type: UserActionTypes.SET_USER_ERROR,
    payload: string,
}

export type UserAction = SetUserDataAction |
                        LogoutUserAction | 
                        AppLoadingAction | 
                        ForeignUserLoadingAction |
                        SetForeignUserDataAction |
                        SetUserErrorAction |
                        SetIsFollowedAction |
                        SetIsFollowedOnSubsAction |
                        SetUserFollowAction;

export interface UserType {
    id: number,
    avatar?: string,
    profileCover?: string,
    email: string,
    name: string,
    description: string,
    country?: string,
    link?: string,
    followCount?: number,
    subsCount?: number,
    birthDate?: string,
    createdAt?: string,
    isBanned?: boolean,
}

export interface EditProfileType {
    name: string,
    description: string | null,
    country: string | null,
    link: string | null,
    birthDate: string | null,
    avatar: string | null,
    profileCover: string | null
  }

export interface ForeignUserType {
  isFollowed?: boolean,
  followCount?: number,
  subsCount?: number,
  id: number,
  avatar?: string,
  profileCover?: string,
  email: string,
  name: string,
  description: string,
  country?: string,
  link?: string,
  birthDate?: string,
  createdAt?: string,
}

export interface FollowType {
  userId: number,
  avatar: string,
  name: string,
  isFollowed: boolean,
};

export interface UserState {
    isAppLoading: boolean;
    isAuth: boolean;
    user: UserType | null;
    userSubs: FollowType[];
    isPageLoading: boolean;
    foreignUser: ForeignUserType | null;
    userError: string;
}