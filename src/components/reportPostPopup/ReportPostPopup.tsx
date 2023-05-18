import React, { useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { Notify } from '../../services/toast';
import { ButtonClickEvent } from '../../types/types';
import './reportPostPopup.scss';

interface IPopup {
  postId: number;
  closePopup: () => void;
}

const ReportPostPopup: React.FC<IPopup> = ({postId, closePopup}) => {
  const [text, setText] = useState<string>("");
  const {reportPost} = useActions();
  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      reportPost(postId, text);
      closePopup();
    } else {
      Notify.warn("Жалоба не может быть пустой.");
    }

  }
  return (
    <div className="report-post-container">
      <span>Report post:</span>
      <textarea autoFocus={true} value={text} onChange={(e) => setText(e.target.value)} placeholder='Текст жалобы...'></textarea>
      <div className="buttons">
        <button onClick={onBackClick}>
          Back
        </button>
        <button onClick={onSumbitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReportPostPopup;