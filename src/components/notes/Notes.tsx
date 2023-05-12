import React from "react";
import "./Notes.scss";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { addNoteAC } from "../../store/notes-reducer";
import { Form } from "./form/Form";
import { useAppSelector } from "../../store/store";
import { Header } from "../header/Header";
import { Note } from "./note/Note";
import { useModal } from "../../utils/useModal";

export const Notes = () => {
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useModal();
  const notes = useAppSelector((state) => state.notes);

  return (
    <>
      <Header>
        <button className="button" onClick={toggleModal}>
          Добавить заметку
        </button>
      </Header>
      <div className="notes">
        {notes.length ? notes.map((n) => <Note note={n} />) : <h3>Записки отсутствуют!</h3>}
      </div>
      {isModalOpen && <Form toggleModal={toggleModal} />}
    </>
  );
};
