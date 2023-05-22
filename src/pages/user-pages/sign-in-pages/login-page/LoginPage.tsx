import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatInput from '../../../../components/UI/FloatInput/FloatInput';
import { useActions } from '../../../../hooks/useActions';
import { useFieldState } from '../../../../hooks/useFieldState';
import { useValidationTimer } from '../../../../hooks/useValidationTimer';
import { isEmailValid, isFieldFilled } from '../../../../services/validation';
import { InputChangeHandler } from '../../../../types/types';
import './loginPage.scss';
import { Notify } from '../../../../services/toast';
import { validatePassword } from '../../../../utils/password-validation';

const LoginPage: React.FC = () => {
  const {userAutenticationAsync} = useActions();
  const navigate = useNavigate();

  const [email, setEmail, emailValid] = useFieldState();
  const onEmailChange: InputChangeHandler = (e) => {
    setEmail(e.target.value);
  }
  const [password, setPassword, passwordValid] = useFieldState();
  const onPasswordChange: InputChangeHandler = (e) => {
    setPassword(e.target.value);
  }
  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isFieldFilled(email) && isEmailValid(email))
      emailValid.current = true;
    else
      emailValid.current = false;
    if (isFieldFilled(password) && validatePassword(password, false))
      passwordValid.current = true;
    else
      passwordValid.current = false;

    const allFieldsValid = emailValid.current && passwordValid.current;
    if (!allFieldsValid) {
      startTimer();
    }
    return allFieldsValid;
  }

  const errorCallback = () => {
    emailValid.current = false;
    passwordValid.current = false;
    startTimer();
    Notify.error("Неправильный логин или пароль!");
  }

  const onLoginClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validation()) {
      userAutenticationAsync(email, password, navigate, errorCallback);
    }
  }
  return (
    <main className="login_page">
      <form className="login_form">
        <h1>Вход</h1>
        <FloatInput
          label="Email"
          value={email}
          onChange={onEmailChange}
          isFilled={status || emailValid.current}
          />
        <FloatInput
          label="Пароль"
          type="password"
          value={password}
          onChange={onPasswordChange}
          isFilled={status || passwordValid.current}
          />
        <Link to="/recovering-password">Забыли пароль?</Link>
        <button onClick={onLoginClick}>Войти</button>
      </form>
      <div className="bottom-phrase">
        Нет аккаунта? <Link to="/registration">Зарегистрироваться!</Link>
      </div>
    </main>
  );
}

export default LoginPage;