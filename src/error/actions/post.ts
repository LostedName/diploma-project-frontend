import { ErrorAction } from "..";
import { Notify } from "../../services/toast";
import errorMessages from "../errorMessages";
import statuses from "../errorStatuses";
import statusCodes from "../statusCodes";

export const postCreateBadRequestAction: ErrorAction = (status, statusCode) => {
  if (status === statuses.badRequest && statusCode === statusCodes.BAD_DATA) {
    Notify.error(errorMessages.POST_FIELD_EMPTY);
  }
};

export const postsLoadBadRequestAction: ErrorAction = (status, statusCode) => {
  if (status === statuses.badRequest && statusCode === statusCodes.BAD_DATA) {
    Notify.error(errorMessages.POST_LOAD_ID_EMPTY);
  }
};

// export const postDeleteBadRequestAction: ErrorAction = (status, statusCode) => {
//   if (status === statuses.badRequest && statusCode === statusCodes.BAD_DATA) {
//     Notify.error(errorMessages.POST_LOAD_ID_EMPTY);
//   }
// };

export const internalErrorAction: ErrorAction = (status) => {
  if (status === statuses.internal) {
    Notify.error(errorMessages.INTERNAL_ERROR);
  }
};