import React from "react";
import "./Form.scss";
import { useDispatch } from "react-redux";
import { useInput } from "../../../utils/useInput";
import { addNoteAC } from "../../../store/notes-reducer";

type FormPropsType = {
  toggleModal: () => void;
};

export const Form = ({ toggleModal }: FormPropsType) => {
  const dispatch = useDispatch();

  const title = useInput("");
  const note = useInput("");

  const addNote = () => {
    if (title.value.trim() !== "" && note.value.trim() !== "") {
      dispatch(addNoteAC(title.value, note.value));
      title.setValue("");
      note.setValue("");
      toggleModal();
    }
  };

  return (
    <div className="form">
      <div className="formGroup">
        <span className="label">Тема *</span>
        <input type="text" className="input" value={title.value} onChange={title.onChange} />
      </div>
      <div className="formGroup">
        <span className="label">Заметка *</span>
        <textarea className="input" value={note.value} onChange={note.onChange} />
      </div>
      <button onClick={addNote}>Добавить</button>
      <span className="closeButton" onClick={toggleModal}>
        x
      </span>
    </div>
  );
};
