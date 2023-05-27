import { TokenType, setToken, getToken, checkExpirationDate, deleteToken } from './../../services/jwt';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Notify } from '../../services/toast';
import { userService } from '../../services/user';
import { AppThunk } from '../store';
import { EditProfileType, UserActionTypes, UserType, UpdateProfileDto } from './../../types/User';

export const setUserAuthorization = (payload: boolean) => ({
  type: UserActionTypes.SET_AUTHORIZATION,
  payload, 
});

export const setResendVerifySignUpAvailableAction = (payload: boolean) => ({
  type: UserActionTypes.SET_RESEND_VERIFY_SIGN_UP_AVAILABLE,
  payload, 
});

export const setSignUpConfirmedAvailableAction = (payload: boolean) => ({
  type: UserActionTypes.SET_SIGN_UP_CONFIRMED_AVAILABLE,
  payload, 
});
export const setSignUpConfirmationErrorAvailableAction = (payload: boolean) => ({
  type: UserActionTypes.SET_SIGN_UP_CONFIRMATION_ERROR_AVAILABLE,
  payload, 
});

export const setTwoFactorAuthAvailableAction = (payload: boolean) => ({
  type: UserActionTypes.SET_TWO_FACTOR_AUTH_AVAILABLE,
  payload, 
});

export const setUserData = (payload: UserType) => ({
  type: UserActionTypes.SET_USER_DATA,
  payload, 
});
export const updateProfileData = (payload: UpdateProfileDto) => ({
  type: UserActionTypes.UPDATE_PROFILE_DATA,
  payload, 
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

export const userAutenticationAsync = (email: string, password: string, navigate: NavigateFunction, errorCallback: () => void): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await userService.userAutentication(email, password);
    if (status.toString()[0] === "2") {
        const {token, verified} = data;
        if (token && verified) {
          setToken(token, TokenType.TwoFactorAuth);
          //go to 2f-auth screen
          dispatch(setTwoFactorAuthAvailableAction(true));
          navigate('/two-factor-auth');
          return;
        } else {
          //go to sign-up check email
          dispatch(setResendVerifySignUpAvailableAction(true));
          navigate(`/sign-up-check-email?email=${email}`);
          return;
        }
    }
  } catch(err) {
    errorCallback();
  }
}

export const registerUserAsync = (email: string, firstname: string, lastname: string, password: string, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {status} = await userService.userRegistration(email, firstname, lastname, password);
    if (status.toString()[0] === "2") {
        dispatch(setResendVerifySignUpAvailableAction(true));
        navigate(`/sign-up-check-email?email=${email}`);
      }
  } catch(error) {
    if (axios.isAxiosError(error)) {
      const status: number = error.response?.status || 0;
      const data = error.response?.data;
      console.log("ERROR DATA:", data);
    } else {
      Notify.error("Что-то пошло не так, попробуйте позже.");
    }
  }
}

export const userResendRegistrationVerifyLinkAsync = (email: string, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await userService.userResendRegistrationVerifyLink(email);
    if (status.toString()[0] === "2") {
        Notify.success("Письмо было повторно отправлено вам на почту.");
      }
  } catch(err) {
    
  }
}

export const userConfirmRegistrationAsync = (token: string, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {status} = await userService.userRegistrationConfirm(token);
    if (status.toString()[0] === "2") {
        dispatch(setSignUpConfirmedAvailableAction(true));
        navigate("/signup-confirmed");
      }
  } catch(err) {
    console.log("VERIFY ERROR");
    dispatch(setSignUpConfirmationErrorAvailableAction(true));
    navigate("/signup-confirmation-error");
  }
}

export const userResendTwoFactorAuthCodeAsync = (navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const {status} = await userService.userResendTwoFactorAuthCode();
    if (status.toString()[0] === "2") {
      Notify.success('Новый код был успешно отправлен.');
    }
  } catch(err) {
    Notify.success('Произошла ошибка, попробуйте войти ещё раз.');
    navigate("/login");
  }
}

export const userConfirmTwoFactorAuthCodeAsync = (code: string, setError: React.Dispatch<React.SetStateAction<string>>, navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    console.log("CONFIRMATION REQUEST");
    const {data, status} = await userService.userConfirmTwoFactorAuthCode(code);
    if (status.toString()[0] === "2") {
      Notify.success('Вы успешно вошли, добро пожаловать!');
      setToken(data.token, TokenType.Access);
      deleteToken(TokenType.TwoFactorAuth);
      dispatch(getUserDataAsync());
      dispatch(setUserAuthorization(true));
      navigate('/home');
    }
  } catch(err) {
    if (axios.isAxiosError(err)) {
      const status: number = err.response?.status || 0;
      const description = err.response?.data.error.description;
      const errorCode = err.response?.data.error.code;
      console.log("ERROR DATA:", err.response?.data, errorCode, description);
      if (errorCode === 1001013) {
        setError("Неправильный код, попробуйте ещё раз");
      } else {
        deleteToken(TokenType.TwoFactorAuth);
        Notify.error("Время сессии вышло, повторите вход.");
      }
    } else {
      Notify.error("Что-то пошло не так, попробуйте позже.");
    }
  }
}

export const getUserDataAsync = (): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await userService.getUserData();
    if (status.toString()[0] === "2") {
      const {
        id,
        account,
        avatar_url,
        first_name,
        last_name,
        created_at,
      } = data;
      const userData: UserType = {
        id,
        email: account.email,
        firstname: first_name,
        lastname:last_name,
        avatarUrl: avatar_url,
        createdAt: created_at, 
      };
      dispatch(setUserData(userData));
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const editProfileAsync = (firstName: string, lastName: string, avatarUrl: string): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {data, status} = await userService.editUserProfile(firstName, lastName, avatarUrl);
    if (status.toString()[0] === "2") {
      Notify.success('Профиль успешно обновлён.');
      dispatch(updateProfileData({firstName, lastName, avatarUrl}));
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const resolveUserStateAsync = (navigate: NavigateFunction): AppThunk<void> => async dispatch => {
  try {
    const accessToken = getToken(TokenType.Access);
    if (accessToken && checkExpirationDate(accessToken)) {
      //request user and navigate to home page
      await dispatch(getUserDataAsync());
      return dispatch(setAppLoading(false));
    }
    const twoFactorToken = getToken(TokenType.TwoFactorAuth);
    if (twoFactorToken && checkExpirationDate(twoFactorToken)) {
      await dispatch(setTwoFactorAuthAvailableAction(true));
      navigate('/two-factor-auth');
      return dispatch(setAppLoading(false));
    }
    return dispatch(setAppLoading(false));
  } catch(err) {
    deleteToken(TokenType.Access);
    deleteToken(TokenType.TwoFactorAuth);
    return dispatch(setAppLoading(false));
  }
}