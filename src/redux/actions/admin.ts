import { AdminPostType, AdminType, AdminUserType } from './../../types/Admin';
import { NavigateFunction } from "react-router-dom";
import errorCoverage, { refreshAdminTokenCoverage } from "../../error";
import { internalErrorAction, loginBadRequestAction, loginEmptyFieldsAction, loginNotFoundAction, refreshBadTokenAction } from "../../error/actions/admin";
import { adminService } from "../../services/admin";
import { deleteAccessToken, deleteRefreshToken, getRefreshToken, setAccessToken, setRefreshToken } from "../../services/jwt";
import { Notify } from "../../services/toast";
import { AdminActionTypes } from "../../types/Admin";
import { AppThunk } from "../store";

export const loginAdmin = (admin: AdminType) => ({
  type: AdminActionTypes.LOGIN_ADMIN,
  payload: admin,
});
export const logoutAdmin = () => ({
  type: AdminActionTypes.LOGOUT_ADMIN,
});
export const setAppLoading = (payload: boolean) => ({
  type: AdminActionTypes.SET_APP_LOADING,
  payload,
});
export const setAdminPageLoading = (payload: boolean) => ({
  type: AdminActionTypes.SET_PAGE_LOADING,
  payload,
});
export const deleteUserFromList = (userId: number) => ({
  type: AdminActionTypes.DELETE_USER_FROM_LIST,
  payload: userId,
});
export const setAdminUsers = (payload: AdminUserType[]) => ({
  type: AdminActionTypes.SET_ADMIN_USERS,
  payload,
});
export const setAdminPosts = (payload: AdminPostType[]) => ({
  type: AdminActionTypes.SET_ADMIN_POSTS,
  payload,
});
export const deleteAdminPost = (postId: number) => ({
  type: AdminActionTypes.DELETE_ADMIN_POST,
  payload: postId,
});
export const discardAllReports = (postId: number) => ({
    type: AdminActionTypes.DISCARD_ALL_REPORTS,
    payload: postId,
});
export const loginAdminAsync = (login: string, password: string, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await adminService.loginAdmin(login, password);
    if (status.toString()[0] === "2") {
        const {admin, accessToken, refreshToken} = data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        Notify.success("Вы успешно авторизованы!");
        dispatch(loginAdmin(admin));
      navigate('/users');
    }
  } catch(err) {
    errorCoverage(err, [loginNotFoundAction, loginBadRequestAction, loginEmptyFieldsAction, internalErrorAction]);
  }
}

export const getAdminUsersAsync = (): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setAdminPageLoading(true));
    const {data} = await adminService.getAdminUsers();
    const fixedData = data.map((user: any) => ({...user, postsCount: parseInt(user.postsCount)}));
    await dispatch(setAdminUsers(fixedData));
    await dispatch(setAdminPageLoading(false));
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const getAdminPostsAsync = (): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setAdminPageLoading(true));
    const {data} = await adminService.getAllPosts();
    const fixedData = data.map((post: any) => ({...post, likesCount: parseInt(post.likesCount), reportsCount: parseInt(post.reportsCount)}));
    await dispatch(setAdminPosts(fixedData));
    await dispatch(setAdminPageLoading(false));
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const getAdminDeletedPostsAsync = (): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setAdminPageLoading(true));
    const {data} = await adminService.getAllDeletedPosts();
    const fixedData = data.map((post: any) => ({...post, likesCount: parseInt(post.likesCount), reportsCount: parseInt(post.reportsCount)}));
    await dispatch(setAdminPosts(fixedData));
    await dispatch(setAdminPageLoading(false));
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const getAdminBannedUsersAsync = (): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setAdminPageLoading(true));
    const {data} = await adminService.getAdminBannedUsers();
    await dispatch(setAdminUsers(data));
    await dispatch(setAdminPageLoading(false));
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const banUserAsync = (userId: number, reason: string): AppThunk<void> => async dispatch => {
  try {
    const {data} = await adminService.banUser(userId, reason);
    await dispatch(setAdminPageLoading(false));
    dispatch(deleteUserFromList(userId));
    Notify.success("Пользователь успешно забанен!");
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const deletePostAsync = (postId: number): AppThunk<void> => async dispatch => {
  try {
    const {data} = await adminService.deletePost(postId);
    await dispatch(deleteAdminPost(postId));
    Notify.success("Пост успешно удалён!");
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const recoverPostAsync = (postId: number): AppThunk<void> => async dispatch => {
  try {
    const {data} = await adminService.recoverPost(postId);
    await dispatch(deleteAdminPost(postId));
    Notify.success("Пост успешно восстановален!");
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const discardReportsAsync = (postId: number): AppThunk<void> => async dispatch => {
  try {
    const {data} = await adminService.discardAllReports(postId);
    await dispatch(discardAllReports(postId));
    Notify.success("Все жалобы успешно удалены!");
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const unbanUserAsync = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await adminService.unbanUser(userId);
    dispatch(deleteUserFromList(userId));
    Notify.success("Пользователь успешно разбанен!");
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const loadAdminAsync = (): AppThunk<void> => async dispatch => {
  try {
    await dispatch(getAdminDataAsync());
    return dispatch(setAppLoading(false));
  } catch(err) {
    if (getRefreshToken()) {
      await dispatch(refreshAdminTokenAsync());
      await dispatch(getAdminDataAsync());
      return dispatch(setAppLoading(false));
    }
    return dispatch(setAppLoading(false));
  }
}
export const getAdminDataAsync = (): AppThunk<void> => async dispatch => {
  try {
    const {data} = await adminService.getAdminData();
    dispatch(loginAdmin(data));
  } catch (err) {
    await refreshAdminTokenCoverage(err, dispatch, true);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const refreshAdminTokenAsync = (): AppThunk<void> => async () => {
  try {
    const {data, status} = await adminService.refreshToken();
    if (status.toString()[0] === "2") {
      const {accessToken, refreshToken} = data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
  } catch (err) {
    deleteAccessToken();
    deleteRefreshToken();
    errorCoverage(err, [refreshBadTokenAction, internalErrorAction]);
  }
}