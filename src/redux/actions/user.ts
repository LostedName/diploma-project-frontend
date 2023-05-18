import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import errorCoverage, { refreshTokenCoverage } from '../../error';
import { internalErrorAction, loginBadRequestAction, loginEmptyFieldsAction, loginNotFoundAction, refreshBadTokenAction, reportAlreadyExistAction, userAlreadyExistAction } from '../../error/actions/user';
import statusCodes from '../../error/statusCodes';
import statuses from '../../error/errorStatuses';
import { deleteAccessToken, deleteRefreshToken, getRefreshToken, setAccessToken, setRefreshToken } from '../../services/jwt';
import { Notify } from '../../services/toast';
import { userService } from '../../services/user';
import { AppThunk } from '../store';
import { EditProfileType, FollowType, ForeignUserType, UserActionTypes, UserType } from './../../types/User';
import { postService } from '../../services/post';

export const setUserData = (payload: UserType) => ({
  type: UserActionTypes.SET_USER_DATA,
  payload, 
});
export const setForeignUserData = (payload: ForeignUserType) => ({
  type: UserActionTypes.SET_FOREIGN_USER_DATA,
  payload, 
});
export const setIsFollowed = (payload: boolean) => ({
  type: UserActionTypes.SET_IS_FOLLOWED,
  payload, 
});
export const setIsFollowedOnSubs = (isFollowed: boolean, userId: number) => ({
  type: UserActionTypes.SET_IS_FOLLOWED_ON_SUBS,
  payload: {
    isFollowed,
    userId,
  }, 
});
export const setUserError = (payload: string) => ({
  type: UserActionTypes.SET_USER_ERROR,
  payload, 
});
export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});
export const setAppLoading = (payload: boolean) => ({
  type: UserActionTypes.SET_APP_LOADING,
  payload,
});
export const setForeignUserLoading = (payload: boolean) => ({
  type: UserActionTypes.SET_FOREIGN_USER_LOADING,
  payload,
});
export const setUserFollows = (payload: FollowType[]) => ({
  type: UserActionTypes.SET_USER_FOLLOWS,
  payload,
});

export const loginUserAsync = (email: string, password: string, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await userService.loginUser(email, password);
    if (status.toString()[0] === "2") {
        const {user, accessToken, refreshToken} = data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        Notify.success("Вы успешно авторизованы!");
        dispatch(setUserData(user));
      navigate('/');
    }
  } catch(err) {
    errorCoverage(err, [loginNotFoundAction, loginBadRequestAction, loginEmptyFieldsAction, internalErrorAction]);
  }
}
export const registerUserAsync = (email: string, name: string, password: string, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await userService.registerUser(email, name, password);
    if (status.toString()[0] === "2") {
        const {user, accessToken, refreshToken} = data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        Notify.success("Вы успешно зарегистрированы!");
        dispatch(setUserData(user));
        navigate('/');
      }
  } catch(err) {
    errorCoverage(err, [userAlreadyExistAction, loginEmptyFieldsAction, internalErrorAction]);
  }
}
export const getUserDataAsync = (): AppThunk<void> => async dispatch => {
  try {
    const {data} = await userService.getUserData();
    const fixedData = {
      ...data,
      followCount: parseInt(data.followCount),
      subsCount: parseInt(data.subsCount), 
    };
    dispatch(setUserData(fixedData));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch, true);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const getUserFollowsAsync = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setUserError(""));
    await dispatch(setForeignUserLoading(true));
    const {data} = await userService.getUserSubscripitions(userId);
    const fixedData = data.map((follow: any) => ({
      ...follow,
      isFollowed: follow.isFollowed === "1" ? true : false,
    }));
    await dispatch(setUserFollows(fixedData));
    await dispatch(setForeignUserLoading(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
    dispatch(setForeignUserLoading(false));
  }
}
export const getUserSubscribersAsync = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setUserError(""));
    await dispatch(setForeignUserLoading(true));
    const {data} = await userService.getUserSubscribers(userId);
    const fixedData = data.map((follow: any) => ({
      ...follow,
      isFollowed: follow.isFollowed === "1" ? true : false,
    }));
    await dispatch(setUserFollows(fixedData));
    await dispatch(setForeignUserLoading(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
    dispatch(setForeignUserLoading(false));
  }
}
export const getForeignUserDataAsync = (userId: number, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    await dispatch(setUserError(""));
    await dispatch(setForeignUserLoading(true));
    const {data} = await userService.getForeignUserData(userId);
    const fixedData = {
      ...data,
      isFollowed: data.isFollowed === "1" ? true : false,
      followCount: parseInt(data.followCount),
      subsCount: parseInt(data.subsCount), 
    };
    await dispatch(setForeignUserData(fixedData));
    await dispatch(setForeignUserLoading(false));
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === statuses.badRequest && err.response?.data === statusCodes.CANT_GET_YOURSELF) {
        navigate("/profile");
      }
      if (err.response?.status === statuses.notFound && err.response.data === statusCodes.USER_NOT_FOUND) {
        dispatch(setUserError(statusCodes.USER_NOT_FOUND));
      }
    }
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
    dispatch(setForeignUserLoading(false));
  }
}
export const subscribeToUser = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await userService.subscribeUser(userId);
    dispatch(setIsFollowed(true));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const editProfile = (bodyObj: EditProfileType): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {data} = await userService.editProfile(bodyObj);
    let user: any = {...getState().userStore.user, ...bodyObj};
    await dispatch(setUserData(user));
    Notify.success("Профиль успешно изменён!");
    console.log(data);
    
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const reportPost = (postId: number, text: string): AppThunk<void> => async dispatch => {
  try {
    await postService.reportPost(postId, text);
    Notify.success("Жалоба успешно отправлена!");
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      reportAlreadyExistAction,
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const unsubscribeFromUser = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await userService.unsubscribeUser(userId);
    dispatch(setIsFollowed(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const subscribeToUserSubs = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await userService.subscribeUser(userId);
    dispatch(setIsFollowedOnSubs(true, userId));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const unsubscribeFromUserSubs = (userId: number): AppThunk<void> => async dispatch => {
  try {
    await userService.unsubscribeUser(userId);
    dispatch(setIsFollowedOnSubs(false, userId));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const loadUserAsync = (): AppThunk<void> => async dispatch => {
  try {
    await dispatch(getUserDataAsync());
    return dispatch(setAppLoading(false));
  } catch(err) {
    if (getRefreshToken()) {
      await dispatch(refreshTokenAsync());
      await dispatch(getUserDataAsync());
      return dispatch(setAppLoading(false));
    }
    return dispatch(setAppLoading(false));
  }
}
export const refreshTokenAsync = (): AppThunk<void> => async () => {
  try {
    const {data, status} = await userService.refreshToken();
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