import React from 'react';
import { useActions } from '../../hooks/useActions';
import { useFieldState } from '../../hooks/useFieldState';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useValidationTimer } from '../../hooks/useValidationTimer';
import { isFieldFilled, isUrlValid } from '../../services/validation';
import { ButtonClickEvent, InputChangeHandler } from '../../types/types';
import { EditProfileType } from '../../types/User';
import FloatInput from '../UI/FloatInput/FloatInput';
import './editProfilePopup.scss';

interface IPopup {
  closePopup: () => void;
}

const EditProfilePopup: React.FC<IPopup> = ({closePopup}) => {
  const user = useTypedSelector((state) => state.userStore.user);
  
  // const {editProfile} = useActions();

  const [firstName, setFirstName, firstNameValid] = useFieldState(user?.firstname);
  const onFirstNameChange: InputChangeHandler = (e) => {
    setFirstName(e.target.value);
  }

  const [lastName, setLastName, lastNameValid] = useFieldState(user?.lastname);
  const onLastNameChange: InputChangeHandler = (e) => {
    setLastName(e.target.value);
  }

  const [avatarUrl, setAvatarUrl, avatarUrlValid] = useFieldState(user?.avatarUrl ?? "");
  const onAvatarUrlChange: InputChangeHandler = (e) => {
    setAvatarUrl(e.target.value);
  }

  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isFieldFilled(firstName))
      firstNameValid.current = true;
    else
    firstNameValid.current = false;
  
    if (isFieldFilled(lastName))
    lastNameValid.current = true;
    else
    lastNameValid.current = false;

    if (isFieldFilled(avatarUrl)) {
      if (isUrlValid(avatarUrl)) {
        firstNameValid.current = true;
      } else {
        firstNameValid.current = false;
      }
    }
    startTimer();
    const allFieldsValid = firstNameValid.current;
    return allFieldsValid;
  }
  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    if (validation()) {
      const bodyObj: EditProfileType = {
        firstname: firstName,
        lastname: lastName,
        avatarUrl: avatarUrl?.trim() || null,
      };
      // editProfile(bodyObj);
      closePopup();
    }
  }
  return (
    <div className="edit-profile-container">
      <span>Edit profile:</span>
      <div className="input-wrapper">
        <FloatInput label="FirstName" value={firstName} onChange={onFirstNameChange} isFilled={status || firstNameValid.current} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="LastName" value={lastName} onChange={onLastNameChange} isFilled={status || lastNameValid.current} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="AvatarUrl" value={avatarUrl} onChange={onAvatarUrlChange} isFilled={status || avatarUrlValid.current} />
      </div>
      <div className="buttons">
        <button onClick={onBackClick}>
          Back
        </button>
        <button onClick={onSumbitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditProfilePopup;