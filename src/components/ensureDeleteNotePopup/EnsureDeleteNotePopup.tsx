import React from 'react';
import { ButtonClickEvent, InputChangeHandler } from '../../types/types';
import './ensureDeleteNotePopup.scss';
import PopupBackground from '../PopupBackground/PopupBackground';
import { useFieldState } from '../../hooks/useFieldState';
import { useValidationTimer } from '../../hooks/useValidationTimer';
import { isFieldFilled } from '../../services/validation';
import FloatInput from '../UI/FloatInput/FloatInput';
import { useActions } from '../../hooks/useActions';

interface IPopup {
  noteId: number;
  closePopup: () => void;
}

const EnsureDeleteNotePopup: React.FC<IPopup> = ({noteId, closePopup}) => {
  const {deleteUserNoteAsync} = useActions();
  // const {editPost} = useActions();
  const onClosePopup = () => {
    closePopup();
  }

  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    deleteUserNoteAsync(noteId, onClosePopup);
  }

  return (
    <PopupBackground closePopup={onClosePopup}>
      <form className="ensure_delete_note_popup_container"  onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
      <h1>Вы уверены что хотите удалить записку?</h1>
        <div className="buttons">
          <button onClick={onSumbitClick}>
            Удалить
          </button>
          <button onClick={onBackClick}>
            Назад
          </button>
        </div>
      </form>
    </PopupBackground>
  );
};

export default EnsureDeleteNotePopup;