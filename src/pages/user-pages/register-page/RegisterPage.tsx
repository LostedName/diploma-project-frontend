import React, {FC, useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FloatInput from '../../../components/UI/FloatInput/FloatInput';
import { useActions } from '../../../hooks/useActions';
import { useFieldState } from '../../../hooks/useFieldState';
import { useValidationTimer } from '../../../hooks/useValidationTimer';
import { isEmailValid, isFieldFilled, isFieldsEquals } from '../../../services/validation';
import { InputChangeHandler } from '../../../types/types';
import './registerPage.scss';

const RegisterPage: FC = () => {
  const {registerUserAsync} = useActions();
  const navigate = useNavigate();
  const [email, setEmail, emailValid] = useFieldState();
  const onEmailChange: InputChangeHandler = (e) => {
    setEmail(e.target.value);
  }
  const [name, setName, nameValid] = useFieldState();
  const onNameChange: InputChangeHandler = (e) => {
    setName(e.target.value);
  }
  const [password, setPassword, passwordValid] = useFieldState();
  const onPasswordChange: InputChangeHandler = (e) => {
    setPassword(e.target.value);
  }
  const [repeatPassword, setRepeatPassword, repeatPassValid] = useFieldState();
  const onRepeatPasswordChange: InputChangeHandler = (e) => {
    setRepeatPassword(e.target.value);
  }
  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isFieldFilled(email) && isEmailValid(email))
      emailValid.current = true;
    else
      emailValid.current = false;
    if (isFieldFilled(name))
      nameValid.current = true;
    else
      nameValid.current = false;
    if (isFieldFilled(password))
      passwordValid.current = true;
    else
      passwordValid.current = false;
    if (isFieldFilled(repeatPassword))
      repeatPassValid.current = true;
    else
      repeatPassValid.current = false;
    if (isFieldFilled(password) && isFieldFilled(repeatPassword)) {
      if (isFieldsEquals(password, repeatPassword)) {
        passwordValid.current = true;
        repeatPassValid.current = true;
      } else {
        passwordValid.current = false;
        repeatPassValid.current = false; 
      }
    }
    startTimer();
    const allFieldsValid = emailValid.current && nameValid.current && passwordValid.current && repeatPassValid.current;
    return allFieldsValid;
  }
  const onRegisterClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validation()) {
      registerUserAsync(email, name, password, navigate);
    }
  } 

  return (
    <main className="register_page">
      <form className='reg_form'>
        <h1>Sign Up</h1>
        <FloatInput
          value={email}
          onChange={onEmailChange}
          label="Email"
          isFilled={status || emailValid.current}
          />
        <FloatInput
          value={name}
          onChange={onNameChange}
          label="Name"
          isFilled={status || nameValid.current}
          />
        <FloatInput
          value={password}
          onChange={onPasswordChange}
          label="Password"
          type="password"
          isFilled={status || passwordValid.current}
          />
        <FloatInput
          value={repeatPassword}
          onChange={onRepeatPasswordChange}
          label="Repeat password"
          type="password"
          isFilled={status || repeatPassValid.current}
          />
        <button onClick={onRegisterClick}>Sign up</button>
      </form>
      <div className="bottom-phrase">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </main>
  );
}

export default RegisterPage;