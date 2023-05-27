import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Note from '../../../components/note/Note';
import './homePage.scss';
import Portal from '../../../components/portal/Portal';
import EditNotePopup from '../../../components/editNotePopup/EditNotePopup';
import { ButtonClickEvent, NOTES_ON_PAGE, NoteItem } from '../../../types/types';
import CreateNotePopup from '../../../components/createNotePopup/CreateNotePopup';
import BounceLoader from '../../../components/bounceLoader/BounceLoader';
import { DOTS, usePagination } from '../../../hooks/usePagination';
import EnsureDeleteNotePopup from '../../../components/ensureDeleteNotePopup/EnsureDeleteNotePopup';

const HomePage: React.FC = () => {
  const {getUserNotesAsync, setUserNotesPageAction} = useActions();
  const [editNotePopup, setEditNotePopup] = useState<boolean>(false);
  const [ensureDeleteNotePopup, setEnsureDeleteNotePopup] = useState<boolean>(false);
  const [createNotePopup, setCreateNotePopup] = useState<boolean>(false);
  const selectedNoteId = useRef<NoteItem>({id: -1, title: "", content: "", created_at: new Date(), updated_at: new Date()});
  const {notes, notesPage, totalNotesCount, isContentLoading} = useTypedSelector((state) => state.noteStore);
  const paginationRange = usePagination(
    totalNotesCount,
    NOTES_ON_PAGE,
    notesPage,
    1,
  );
  const navigate = useNavigate();
  const createNoteBtnClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    setCreateNotePopup(true);
  }

  const onEditBtnClick = (note: NoteItem) => {
    setEditNotePopup(true);
    selectedNoteId.current = note;
  }
  const onDeleteBtnClick = (noteId: number) => {
    setEnsureDeleteNotePopup(true);
    selectedNoteId.current.id = noteId;
  }
  const nextPage: () => void = () => {
    if (notesPage < paginationRange[paginationRange.length - 1])
      setUserNotesPageAction(notesPage + 1,totalNotesCount);
  };
  const prevPage: () => void = () => {
    if (notesPage > 1) setUserNotesPageAction(notesPage - 1, totalNotesCount);
  };
  const switchPage: (page: number) => void = (page) => {
    setUserNotesPageAction(page, totalNotesCount);
  };
  useEffect(() => {
    getUserNotesAsync(notesPage);
  }, [notesPage]);
  return (
    <main className="home_page">
      <Portal isOpened={createNotePopup}>
        <CreateNotePopup closePopup={() => setCreateNotePopup(false)} />
      </Portal>
      <Portal isOpened={editNotePopup}>
        <EditNotePopup noteId={selectedNoteId.current.id} noteTitle={selectedNoteId.current.title} noteContent={selectedNoteId.current.content} closePopup={() => setEditNotePopup(false)} />
      </Portal>
      <Portal isOpened={ensureDeleteNotePopup}>
        <EnsureDeleteNotePopup noteId={selectedNoteId.current.id}  closePopup={() => setEnsureDeleteNotePopup(false)} />
      </Portal>
        <div className='header'>
          Мои записки
        </div>
        <div className='content'>
          {
            isContentLoading ? 
            <div className='center_container'>
              <BounceLoader/>
            </div>
            :
            notes.length === 0 
            ? 
          <div className='center_container'>
            Записок нет. Вы можете добавить их используя кнопку в правом нижнем углу.
          </div> 
            : 
          <div className='notes_container'>
            <div className='notes'>
              {notes.map((note) => (
                <Note note={note} onDelete={() => onDeleteBtnClick(note.id)} onEdit={() => onEditBtnClick(note)} />
                ))}
            </div>
            <div className='pagination_wrapper'>
              <img className='back_btn'
                src="./assets/backButton.png"
                alt="back button"
                onClick={prevPage}
              />
              {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                  return <button className='page_number_btn'>...</button>;
                }
                return notesPage === pageNumber ? (
                  <button className='page_number_btn current'>{pageNumber}</button>
                ) : (
                  <button className='page_number_btn' onClick={() => switchPage(pageNumber)}>
                    {pageNumber}
                  </button>
                );
              })}
              <img className='next_btn'
                src="./assets/backButton.png"
                alt="next button"
                onClick={nextPage}
              />
            </div>
          </div>
          }
          <button className='add_note_btn' onClick={createNoteBtnClick}>
            <img src="/assets/plus.png" alt="plus" />
          </button>
        </div>
    </main>
  );
}

export default HomePage;