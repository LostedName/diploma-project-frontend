import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatInput from '../../../components/UI/FloatInput/FloatInput';
import { useActions } from '../../../hooks/useActions';
import { useFieldState } from '../../../hooks/useFieldState';
import { useValidationTimer } from '../../../hooks/useValidationTimer';
import { isEmailValid, isFieldFilled } from '../../../services/validation';
import { InputChangeHandler } from '../../../types/types';
import './forgotPassPage.scss';

const ForgotPassPage: React.FC = () => {
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
    if (isFieldFilled(password))
      passwordValid.current = true;
    else
      passwordValid.current = false;

    startTimer();
    const allFieldsValid = emailValid.current && passwordValid.current;
    return allFieldsValid;
  }

  const errorCallback = () => {}
  const onLoginClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validation()) {
      userAutenticationAsync(email, password, navigate, errorCallback);
    }
  }
  return (
    <main className="forgot_pass_page">
      <form className="forgot_pass_form">
        <h1>Forgot password?</h1>
        <span className="phrase">No worries, we’ll send you reset link on your email.</span>
        <FloatInput
          label="Email"
          value={email}
          onChange={onEmailChange}
          isFilled={status || emailValid.current}
          />
        <button onClick={onLoginClick}>Send link</button>
        <div className="bottom-phrase">
          Back to <Link to="/login">Login!</Link>
        </div>
      </form>
    </main>
  );
}

export default ForgotPassPage;