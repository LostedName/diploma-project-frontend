import React from 'react';
import { ButtonClickEvent, InputChangeHandler } from '../../types/types';
import './createNotePopup.scss';
import PopupBackground from '../PopupBackground/PopupBackground';
import FloatInput from '../UI/FloatInput/FloatInput';
import { useFieldState } from '../../hooks/useFieldState';
import { useValidationTimer } from '../../hooks/useValidationTimer';
import { isFieldFilled } from '../../services/validation';
import { useActions } from '../../hooks/useActions';

interface IPopup {
  closePopup: () => void;
}

const CreateNotePopup: React.FC<IPopup> = ({closePopup}) => {
  const {createUserNotesAsync, setContentIsLoadingAction} = useActions();
  const [title, setTitle, titleValid] = useFieldState("");
  const onTitleChange: InputChangeHandler = (e) => {
    setTitle(e.target.value);
  }
  const [content, setContent, contentValid] = useFieldState("");
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
    // editPost(id.current, text, type);
    if (validation()) {
      setContentIsLoadingAction(true);
      createUserNotesAsync(title, content, closePopup);
    }
  }
  return (
    <PopupBackground closePopup={onClosePopup}>
      <form className="create_note_popup_container" onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
        <h1>Создание записки</h1>
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
            Создать
          </button>
          <button onClick={onBackClick}>
            Назад
          </button>
        </div>
      </form>
    </PopupBackground>
  );
};

export default CreateNotePopup;