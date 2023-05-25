import { Notify } from '../../services/toast';
import { AppThunk } from '../store';
import { NoteActionTypes } from '../../types/Note';
import { NoteObject } from '../../types/types';
import { noteService } from '../../services/note';

export const addNoteAction = (payload: NoteObject) => ({
  type: NoteActionTypes.ADD_NEW_NOTE,
  payload,
});

export const setNotesAction = (payload: NoteObject[]) => ({
  type: NoteActionTypes.SET_USER_NOTES,
  payload, 
});

export const setUserNotesPageAction = (
  page: number,
  notesCount: number,
) => ({
  type: NoteActionTypes.SET_NOTES_PAGE,
  payload: {
    page,
    notesCount,
  },
});

export const setContentIsLoadingAction = (payload: boolean) => ({
  type: NoteActionTypes.SET_IS_CONTENT_LOADING,
  payload,
});

export const updateUserNoteAction = (payload: NoteObject) => ({
  type: NoteActionTypes.UPDATE_USER_NOTE,
  payload, 
});

export const getUserNotesAsync = (page: number): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await noteService.getFullNotesListWithPagination(page);
    if (status.toString()[0] === "2") {
      const {
        items,
        total,
      } = data;
      const userNotes: NoteObject[] = items;
      dispatch(setNotesAction(userNotes));
      dispatch(setUserNotesPageAction(page, total));
      dispatch(setContentIsLoadingAction(false));
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const createUserNotesAsync = (title: string, content: string, callback: () => void): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {status} = await noteService.createNote(title, content);
    if (status.toString()[0] === "2") {
      const {noteStore} = getState();
      await dispatch(getUserNotesAsync(noteStore.notesPage));
      await dispatch(setContentIsLoadingAction(false));
      callback();
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const editUserNoteAsync = (id: number, title: string, content: string, callback: () => void): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {data, status} = await noteService.editNote(id, title, content);
    if (status.toString()[0] === "2") {
      await dispatch(updateUserNoteAction(data));
      callback();
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}

export const deleteUserNoteAsync = (id: number, callback: () => void): AppThunk<void> => async (dispatch, getState) => {
  try {
    const {data, status} = await noteService.deleteNote(id);
    if (status.toString()[0] === "2") {
      const {noteStore} = getState();
      let currentPage = noteStore.notesPage;
      const totalItems = noteStore.totalNotesCount - 1;
      const totalPagesCount = Math.ceil(totalItems / 10);
      if (currentPage > totalPagesCount) {
        currentPage = totalPagesCount;
      } 
      await dispatch(getUserNotesAsync(currentPage));
      await dispatch(setContentIsLoadingAction(false));
      callback();
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}