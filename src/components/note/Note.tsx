import React from 'react';
import { ButtonClickEvent, NoteObject } from '../../types/types';
import "./note.scss";

interface NoteComponent {
  note: NoteObject;
  onEdit: () => void;
  onDelete: () => void;
}
 

const Note: React.FC<NoteComponent> = ({note, onEdit, onDelete}) => {
  const onEditClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    onEdit();
  }

  const onDeleteClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    onDelete();
  }
  const dateTime = note.updated_at.toLocaleString().split("T");

  return (
    <div className='single_note_wrapper' key={note.id}>
      <div className='note_component'>
        <div className='note_title'>
            <div className='text'>
              {note.title}
            </div>
            <div className='buttons'>
              <button onClick={onEditClick}>
                <img src="/assets/edit.png" alt="edit"/>
              </button>
              <button onClick={onDeleteClick}>
                <img src="/assets/trashbox.png" alt="delete"/>
              </button>
            </div>
        </div>
        <div className='note_content'>
            {note.content}
        </div>
        <div className='note_created_at'>
            {note.updated_at === note.created_at ? "Создана в" : "Обновлена в"} {`${dateTime[1].split('.')[0]}, ${dateTime[0]}`}
        </div>
      </div>
    </div>
  );
}

export default Note;