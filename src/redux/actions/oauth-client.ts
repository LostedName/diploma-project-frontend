import { Notify } from '../../services/toast';
import { AppThunk } from '../store';
import { OAuthClientFullItem, OAuthClientListItem } from '../../types/types';
import { OAuthClientActionTypes } from '../../types/OAuthClient';
import { oauthClientService } from '../../services/oauth-client';

export const addClientAction = (payload: OAuthClientListItem) => ({
  type: OAuthClientActionTypes.ADD_NEW_OAUTH_CLIENT,
  payload,
});

export const setClientsAction = (payload: OAuthClientListItem[]) => ({
  type: OAuthClientActionTypes.SET_USER_OAUTH_CLIENTS,
  payload, 
});

export const setUserClientsPageAction = (
  page: number,
  clientsCount: number,
) => ({
  type: OAuthClientActionTypes.SET_OAUTH_CLIENTS_PAGE,
  payload: {
    page,
    itemsCount: clientsCount,
  },
});

export const setContentIsLoadingAction = (payload: boolean) => ({
  type: OAuthClientActionTypes.SET_IS_OAUTH_CONTENT_LOADING,
  payload,
});

export const setUserFullClientAction = (payload: OAuthClientFullItem) => ({
  type: OAuthClientActionTypes.SET_USER_OAUTH_CLIENT,
  payload, 
});

export const getUserClientsAsync = (page: number): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await oauthClientService.getFullOAuthClientsListWithPagination(page);
    if (status.toString()[0] === "2") {
      const {
        items,
        total,
      } = data;
      const userNotes: OAuthClientListItem[] = items;
      dispatch(setClientsAction(userNotes));
      dispatch(setUserClientsPageAction(page, total));
      dispatch(setContentIsLoadingAction(false));
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const getUserClientByIdAsync = (clientId: number): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {data, status} = await oauthClientService.getFullOAuthClientById(clientId);
    if (status.toString()[0] === "2") {
      dispatch(setUserFullClientAction(data));
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const createUserClientAsync = (name: string, description: string, homepageUrl: string, redirectUris: string[], callback: () => void): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {data, status} = await oauthClientService.createOAuthClient(name, description, homepageUrl, redirectUris);
    if (status.toString()[0] === "2") {
      dispatch(setUserFullClientAction(data));
      dispatch(addClientAction(data));
      dispatch(setContentIsLoadingAction(false));
      callback();//go to client page => show popup with client secret
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

// export const editUserNoteAsync = (id: number, title: string, content: string, callback: () => void): AppThunk<void> => async (dispatch, getState) => {
//   try {
//     const {data, status} = await noteService.editNote(id, title, content);
//     if (status.toString()[0] === "2") {
//       await dispatch(updateUserNoteAction(data));
//       callback();
//     }
//   } catch (err) {
//     Notify.error("Пожалуйста, повторите вход.");
//   }
// }

// export const deleteUserNoteAsync = (id: number, callback: () => void): AppThunk<void> => async (dispatch, getState) => {
//   try {
//     const {data, status} = await noteService.deleteNote(id);
//     if (status.toString()[0] === "2") {
//       const {noteStore} = getState();
//       let currentPage = noteStore.notesPage;
//       const totalItems = noteStore.totalNotesCount - 1;
//       const totalPagesCount = Math.ceil(totalItems / NOTES_ON_PAGE);
//       if (currentPage > totalPagesCount) {
//         currentPage = totalPagesCount;
//       } 
//       await dispatch(getUserNotesAsync(currentPage));
//       await dispatch(setContentIsLoadingAction(false));
//       callback();
//     }
//   } catch (err) {
//     Notify.error("Пожалуйста, повторите вход.");
//   }
// }