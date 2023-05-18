import React, { useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { Notify } from '../../services/toast';
import { ButtonClickEvent } from '../../types/types';
import './banUserPopup.scss';

interface IPopup {
  userId: number;
  userName: string;
  closePopup: () => void;
}

const EditPostPopup: React.FC<IPopup> = ({userId, userName, closePopup}) => {
  const [text, setText] = useState<string>("");
  const {banUserAsync} = useActions();
  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      banUserAsync(userId, text);
      closePopup();
    } else {
      Notify.warn("Текст не может быть пустым.");
    }
  }
  return (
    <div className="edit-popup-container">
      <span>Ban user {`${userName}`}:</span>
      <textarea autoFocus={true} value={text} onChange={(e) => setText(e.target.value)} placeholder='Ban reason...'></textarea>
      <div className="buttons">
        <button onClick={onBackClick}>
          Back
        </button>
        <button onClick={onSumbitClick}>
          Ban
        </button>
      </div>
    </div>
  );
};

export default EditPostPopup;