import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatInput from '../../../components/UI/FloatInput/FloatInput';
import { useActions } from '../../../hooks/useActions';
import { useFieldState } from '../../../hooks/useFieldState';
import { useValidationTimer } from '../../../hooks/useValidationTimer';
import { isEmailValid, isFieldFilled } from '../../../services/validation';
import { InputChangeHandler } from '../../../types/types';
import './homePage.scss';
import { Notify } from '../../../services/toast';
import { validatePassword } from '../../../utils/password-validation';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

const HomePage: React.FC = () => {
  const {getUserNotesAsync} = useActions();
  const navigate = useNavigate();
  const {notes} = useTypedSelector((state) => state.noteStore);
  useEffect(() => {
    getUserNotesAsync();
  }, []);
  return (
    <main className="home_page">
        <div className='header'>
          Мои записки
        </div>
        <div className='notes_container'>
          {
            notes.length === 0 
            ? <div>Записок нет</div> 
            : notes.map((note) => (
          <div className='note' key={note.id}>
            <div className='note_title'>
              {note.title}
            </div>
            <div className='note_content'>
              {note.content}
            </div>
            <div className='note_created_at'>
              Создана: {note.created_at}
            </div>
          </div>
            ))
          }
        </div>
    </main>
  );
}

export default HomePage;