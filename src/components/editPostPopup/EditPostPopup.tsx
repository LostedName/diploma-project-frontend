import React, { useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { ButtonClickEvent } from '../../types/types';
import './editPostPopup.scss';

interface IPopup {
  postId: number;
  postText: string;
  type: "posts" | "main" | "liked",
  closePopup: () => void;
}

const EditPostPopup: React.FC<IPopup> = ({postId, postText, type, closePopup}) => {
  const id = useRef<number>(postId);
  const [text, setText] = useState<string>(postText);
  const {editPost} = useActions();
  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    editPost(id.current, text, type);
    closePopup();
  }
  return (
    <div className="edit-popup-container">
      <span>Edit post:</span>
      <textarea autoFocus={true} value={text} onChange={(e) => setText(e.target.value)} placeholder='Содержание поста'></textarea>
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

export default EditPostPopup;