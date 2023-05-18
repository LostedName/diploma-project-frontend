export enum AdminActionTypes {
  LOGIN_ADMIN="LOGIN_ADMIN",
  LOGOUT_ADMIN="LOGOUT_ADMIN",
  SET_APP_LOADING="SET_APP_LOADING",
  SET_PAGE_LOADING="SET_PAGE_LOADING",
  SET_ADMIN_USERS="SET_ADMIN_USERS",
  SET_ADMIN_POSTS="SET_ADMIN_POSTS",
  DELETE_ADMIN_POST="DELETE_ADMIN_POST",
  DISCARD_ALL_REPORTS="DISCARD_ALL_REPORTS",
  DELETE_USER_FROM_LIST="DELETE_USER_FROM_LIST"
}

export interface LoginAdminAction {
    type: AdminActionTypes.LOGIN_ADMIN;
    payload: AdminType;
}
export interface LogoutAdminAction {
    type: AdminActionTypes.LOGOUT_ADMIN;
}
export interface AppLoadingAction {
    type: AdminActionTypes.SET_APP_LOADING,
    payload: boolean,
}
export interface PageLoadingAction {
    type: AdminActionTypes.SET_PAGE_LOADING,
    payload: boolean,
}
export interface SetAdminUsersAction {
    type: AdminActionTypes.SET_ADMIN_USERS,
    payload: AdminUserType[],
}
export interface SetAdminPostsAction {
    type: AdminActionTypes.SET_ADMIN_POSTS,
    payload: AdminPostType[],
}
export interface DeleteAdminPostAction {
    type: AdminActionTypes.DELETE_ADMIN_POST,
    payload: number,
}
export interface DiscardAllReportsAction {
    type: AdminActionTypes.DISCARD_ALL_REPORTS,
    payload: number,
}
export interface DeleteUserFromListAction {
    type: AdminActionTypes.DELETE_USER_FROM_LIST,
    payload: number,
}

export type AdminAction = LoginAdminAction |
                        LogoutAdminAction |
                        AppLoadingAction |
                        SetAdminUsersAction |
                        SetAdminPostsAction |
                        DeleteAdminPostAction |
                        DiscardAllReportsAction |
                        PageLoadingAction |
                        DeleteUserFromListAction;

export type AdminType = {
  id: number,
  login: string,
}
export interface AdminUserType {
  userId: number,
  avatar: string,
  name: string,
  postsCount: number,
  reason?: string,
}
export interface AdminPostType {
  postId: number,
  userId: number,
  text: string,
  updatedAt: string,
  deletedAt?: string,
  avatar: string | null,
  name: string,
  likesCount: number, //comes as string
  reportsCount: number // comes as string
}
export interface AdminState {
  isAppLoading: boolean;
  isPageLoading: boolean;
  isAuth: boolean;
  admin: AdminType | null;
  users: AdminUserType[];
  posts: AdminPostType[];
}
