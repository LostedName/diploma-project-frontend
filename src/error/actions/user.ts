import { ErrorAction } from "..";
import { deleteAccessToken, deleteRefreshToken } from "../../services/jwt";
import { Notify } from "../../services/toast";
import errorMessages from "../errorMessages";
import statuses from "../errorStatuses";
import statusCodes from "../statusCodes";

export const internalErrorAction: ErrorAction = (status, statusCode) => {
  if (status === statuses.internal) {
    Notify.error(errorMessages.INTERNAL_ERROR);
  }
};
export const userAlreadyExistAction: ErrorAction = (status, statusCode) => {
  if (
    status === statuses.badRequest &&
    statusCode === statusCodes.USER_ALREADY_EXIST
  ) {
    Notify.error(errorMessages.USER_ALREADY_EXIST);
  }
};
export const reportAlreadyExistAction: ErrorAction = (status, statusCode) => {
  if (
    status === statuses.badRequest &&
    statusCode === statusCodes.REPORT_ALREADY_EXIST
  ) {
    Notify.error(errorMessages.REPORT_ALREADY_EXIST);
  }
};

export const loginNotFoundAction: ErrorAction = (status, statusCode) => {
  if (
    status === statuses.notFound &&
    statusCode === statusCodes.USER_NOT_FOUND
  ) {
    Notify.error(errorMessages.WRONG_LOGIN_OR_PASS);
  }
};

export const loginBadRequestAction: ErrorAction = (status, statusCode) => {
  if (status === statuses.badRequest && statusCode === statusCodes.BAD_DATA) {
    Notify.error(errorMessages.WRONG_LOGIN_OR_PASS);
  }
};

export const loginEmptyFieldsAction: ErrorAction = (status, statusCode) => {
  if (
    status === statuses.badRequest &&
    statusCode === statusCodes.EMPTY_FIELD
  ) {
    Notify.error(errorMessages.EMPTY_FIELD);
  }
};
export const refreshBadTokenAction: ErrorAction = (status, statusCode) => {
  if (
    (status === statuses.badRequest && statusCode === statusCodes.WRONG_TOKEN) ||
    (status === statuses.badRequest && statusCode === statusCodes.BAD_TOKEN) ||
    (status === statuses.unauthorized && statusCode === statusCodes.MISSING_AUTHORIZATION_HEADER) ||
    (status === statuses.forbidden && statusCode === statusCodes.WRONG_ROLE) ||
    (status === statuses.notFound && statusCode === statusCodes.USER_NOT_FOUND)
  ) {
    deleteAccessToken();
    deleteRefreshToken();
    Notify.error(errorMessages.MUST_LOGIN_AGAIN);
  }
};
