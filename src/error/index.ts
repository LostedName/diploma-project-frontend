import axios from "axios";
import { Notify } from "../services/toast";
import errorMessages from "./errorMessages";
import statusCodes from "./statusCodes";
import statuses from "./errorStatuses";
import { getRefreshToken } from "../services/jwt";
import { ThunkDispatchType } from "../redux/store";
import { getUserDataAsync, refreshTokenAsync } from "../redux/actions/user";
import { getAdminDataAsync, refreshAdminTokenAsync } from "../redux/actions/admin";

export type ErrorAction = (status: number, statusCode: string) => void;

const errorCoverage = (error: unknown, actions: ErrorAction[], defaultMessage: string = errorMessages.DEFAULT_MESSAGE) => {
  if (axios.isAxiosError(error)) {
    const status: number = error.response?.status || 0;
    const statusCode: string = error.response?.data;
    actions.forEach((action) => action(status, statusCode));
  } else {
    Notify.error(defaultMessage);
  }
}
export const refreshTokenCoverage = async (error: unknown, dispatch: ThunkDispatchType, isGetData: boolean = false) => {
  if (axios.isAxiosError(error)) {
    const status: number = error.response?.status || 0;
    const statusCode: string = error.response?.data;
    console.log(error);
    if (status === statuses.unauthorized && statusCode === statusCodes.TOKEN_EXPIRED) {
      if (getRefreshToken()) {
        await dispatch(refreshTokenAsync());
        if (isGetData) {
          await dispatch(getUserDataAsync());
          return;
        }
        Notify.warn("Повторите действие ещё раз.");
      }
    }
  }
} 
export const refreshAdminTokenCoverage = async (error: unknown, dispatch: ThunkDispatchType, isGetData: boolean = false) => {
  if (axios.isAxiosError(error)) {
    const status: number = error.response?.status || 0;
    const statusCode: string = error.response?.data;
    console.log(error);
    if (status === statuses.unauthorized && statusCode === statusCodes.TOKEN_EXPIRED) {
      if (getRefreshToken()) {
        await dispatch(refreshAdminTokenAsync());
        
        if (isGetData) {
          await dispatch(getAdminDataAsync());
          return;
        }
        Notify.warn("Повторите действие ещё раз.");
      }
    }
  }
} 
export default errorCoverage;