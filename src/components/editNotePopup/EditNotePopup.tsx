import React from 'react';
import { ButtonClickEvent, InputChangeHandler } from '../../types/types';
import './editNotePopup.scss';
import PopupBackground from '../PopupBackground/PopupBackground';
import { useFieldState } from '../../hooks/useFieldState';
import { useValidationTimer } from '../../hooks/useValidationTimer';
import { isFieldFilled } from '../../services/validation';
import FloatInput from '../UI/FloatInput/FloatInput';
import { useActions } from '../../hooks/useActions';

interface IPopup {
  noteId: number;
  noteTitle: string;
  noteContent: string;
  closePopup: () => void;
}

const EditNotePopup: React.FC<IPopup> = ({noteId, noteTitle, noteContent, closePopup}) => {
  const {editUserNoteAsync} = useActions();
  const [title, setTitle, titleValid] = useFieldState(noteTitle);
  const onTitleChange: InputChangeHandler = (e) => {
    setTitle(e.target.value);
  }
  const [content, setContent, contentValid] = useFieldState(noteContent);
  const onContentChange: InputChangeHandler = (e) => {
    setContent(e.target.value);
  }

  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isFieldFilled(title))
      titleValid.current = true;
    else
      titleValid.current = false;
    if (isFieldFilled(content))
      contentValid.current = true;
    else
    contentValid.current = false;

    const allFieldsValid = titleValid.current && contentValid.current;
    if (!allFieldsValid) {
      startTimer();
    }
    return allFieldsValid;
  }
  // const {editPost} = useActions();
  const onClosePopup = () => {
    setTitle("");
    setContent("");
    closePopup();
  }

  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    if (validation()) {
      editUserNoteAsync(noteId, title, content, onClosePopup);
    }
  }

  return (
    <PopupBackground closePopup={onClosePopup}>
      <form className="edit_note_popup_container"  onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
      <h1>Изменение записки</h1>
        <FloatInput
          label="Название"
          value={title}
          onChange={onTitleChange}
          isFilled={status || titleValid.current}
          />
        <FloatInput
          label="Содержание"
          value={content}
          onChange={onContentChange}
          isFilled={status || contentValid.current}
          />
        <div className="buttons">
          <button onClick={onSumbitClick}>
            Изменить
          </button>
          <button onClick={onBackClick}>
            Назад
          </button>
        </div>
      </form>
    </PopupBackground>
  );
};

export default EditNotePopup;