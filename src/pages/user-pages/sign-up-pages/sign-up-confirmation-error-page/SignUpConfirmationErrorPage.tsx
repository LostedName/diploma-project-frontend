import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signUpConfirmationErrorPage.scss';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const SignUpConfirmationErrorPage: React.FC = () => {
  const { isSignUpConfirmationErrorAvailable } = useTypedSelector((state) => state.userStore.states);
  const {setSignUpConfirmationErrorAvailableAction} = useActions();
  const navigate = useNavigate();

  const onGoToClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/login");
    setSignUpConfirmationErrorAvailableAction(false);
  }

  useEffect(() => {
    if (!isSignUpConfirmationErrorAvailable) {
      navigate('/login');
      return;
    };
  });
  return (//TODO REWRITE CONTENT
    <main className="sign_up_confirmation_error_page">
      <form className="sign_up_confirmation_error_form">
        <h1>Во время подтверждения почты что-то пошло не так.</h1>
        <span className="phrase">Попробуйте войти в свой аккаунт.</span>
        <button onClick={onGoToClick}>Перейти к форме входа</button>
      </form>
    </main>
  );
}

export default SignUpConfirmationErrorPage;