import { TokenType, setToken, getToken, checkExpirationDate, deleteToken } from './../../services/jwt';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Notify } from '../../services/toast';
import { userService } from '../../services/user';
import { AppThunk } from '../store';
import { EditProfileType, UserActionTypes, UserType } from './../../types/User';
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

export const getUserNotesAsync = (): AppThunk<void> => async dispatch => {
  try {
    const {data, status} = await noteService.getNotesList();
    if (status.toString()[0] === "2") {
      const {
        items,
        total,
      } = data;
      const userNotes: NoteObject[] = items;
      dispatch(setNotesAction(userNotes));
    }
  } catch (err) {
    Notify.error("Пожалуйста, повторите вход.");
  }
}