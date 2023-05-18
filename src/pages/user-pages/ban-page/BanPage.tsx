import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatInput from '../../../components/UI/FloatInput/FloatInput';
import { useActions } from '../../../hooks/useActions';
import { useFieldState } from '../../../hooks/useFieldState';
import { useValidationTimer } from '../../../hooks/useValidationTimer';
import { isEmailValid, isFieldFilled } from '../../../services/validation';
import { InputChangeHandler } from '../../../types/types';
import './banPage.scss';

const BanPage: React.FC = () => {
  const {loginUserAsync} = useActions();
  const navigate = useNavigate();

  return (
    <main className="ban_page">
      <form className="ban_form">
        <h1>You have permanent ban</h1>
      </form>
      <div className="bottom-phrase">
        <Link to="/">Go to home page</Link>
      </div>
    </main>
  );
}

export default BanPage;