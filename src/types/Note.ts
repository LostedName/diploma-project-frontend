import { NoteObject } from "./types";

export enum NoteActionTypes {
    ADD_NEW_NOTE="ADD_NEW_NOTE",
    SET_USER_NOTES="SET_USER_NOTES",
    SET_NOTES_PAGE="SET_NOTES_PAGE",
    UPDATE_USER_NOTE="UPDATE_USER_NOTE",
    SET_IS_CONTENT_LOADING="SET_IS_CONTENT_LOADING",
}

export interface AddNewNoteAction {
    type: NoteActionTypes.ADD_NEW_NOTE;
    payload: NoteObject;
}

export interface SetUserNotesAction {
    type: NoteActionTypes.SET_USER_NOTES;
    payload: NoteObject[];
}
export interface SetUserNotesPageAction {
    type: NoteActionTypes.SET_NOTES_PAGE;
    payload: {
        page: number,
        notesCount: number,
    };
}
export interface UpdateUserNotesPageAction {
    type: NoteActionTypes.UPDATE_USER_NOTE;
    payload: NoteObject;
}
export interface SetIsContentLoadingAction {
    type: NoteActionTypes.SET_IS_CONTENT_LOADING;
    payload: boolean;
}

export type NoteAction = AddNewNoteAction | SetUserNotesAction | SetUserNotesPageAction | UpdateUserNotesPageAction | SetIsContentLoadingAction;

export interface NoteState {
    notes: NoteObject[];
    notesPage: number;
    totalNotesCount: number;
    isContentLoading: boolean;
}