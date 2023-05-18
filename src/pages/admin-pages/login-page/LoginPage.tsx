import React, {FC, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatInput from '../../../components/UI/FloatInput/FloatInput';
import { useActions } from '../../../hooks/useActions';
import { useFieldState } from '../../../hooks/useFieldState';
import { useValidationTimer } from '../../../hooks/useValidationTimer';
import { isEmailValid, isFieldFilled } from '../../../services/validation';
import { InputChangeHandler } from '../../../types/types';
import './loginPage.scss';
const LoginPage: FC = () => {
  const {loginAdminAsync} = useActions();
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
    if (isFieldFilled(password))
      passwordValid.current = true;
    else
      passwordValid.current = false;

    startTimer();
    const allFieldsValid = emailValid.current && passwordValid.current;
    return allFieldsValid;
  }
  const onLoginClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validation()) {
      loginAdminAsync(email, password, navigate);
    }
  }

  return (
    <main className="admin_login_page">
      <form className="login_form">
        <h1>Log In</h1>
        <FloatInput
          label="Email"
          value={email}
          onChange={onEmailChange}
          isFilled={status || emailValid.current}
          />
        <FloatInput
          value={password}
          onChange={onPasswordChange}
          label="Password"
          type="password"
          isFilled={status || passwordValid.current}
          />
        <button onClick={onLoginClick}>Log In</button>
      </form>
    </main>
  );
}

export default LoginPage;