import { NoteObject } from "./types";

export enum NoteActionTypes {
    ADD_NEW_NOTE="ADD_NEW_NOTE",
    SET_USER_NOTES="SET_USER_NOTES",
}

export interface AddNewNoteAction {
    type: NoteActionTypes.ADD_NEW_NOTE;
    payload: NoteObject;
}

export interface SetUserNotesAction {
    type: NoteActionTypes.SET_USER_NOTES;
    payload: NoteObject[];
}

export type NoteAction = AddNewNoteAction | SetUserNotesAction;

export interface NoteState {
    notes: NoteObject[];
}