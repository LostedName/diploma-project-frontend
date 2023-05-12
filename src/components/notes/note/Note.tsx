import React from "react";
import "./Note.scss";
import { EditableSpan } from "../../editableSpan/EditableSpan";
import {
  changeNoteContentAC,
  changeNoteTitleAC,
  deleteNoteAC,
  NotesType,
} from "../../../store/notes-reducer";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";

type NotePropsType = {
  note: NotesType;
};

export const Note = ({ note }: NotePropsType) => {
  const dispatch = useDispatch();

  const deleteNote = (id: string) => () => dispatch(deleteNoteAC(id));
  const changeNoteTitle = (id: string, newTitle: string) => dispatch(changeNoteTitleAC(id, newTitle));
  const changeNoteContent = (id: string, newContent: string) => dispatch(changeNoteContentAC(id, newContent));

  return (
    <div className="note">
      <div className="noteHeader">
        <EditableSpan id={note.id} value={note.title} onChange={changeNoteTitle} />
        <DeleteIcon className="deleteIcon" onClick={deleteNote(note.id)} />
      </div>
      <div className="noteContent">
        <EditableSpan id={note.id} value={note.content} onChange={changeNoteContent} />
      </div>
    </div>
  );
};
