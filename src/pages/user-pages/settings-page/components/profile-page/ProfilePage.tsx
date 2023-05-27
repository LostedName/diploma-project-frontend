import React, {useEffect} from 'react';
import './profilePage.scss';
import { DEFAULT_IMAGE, InputChangeHandler } from '../../../../../types/types';
import FloatInput from '../../../../../components/UI/FloatInput/FloatInput';
import { useFieldState } from '../../../../../hooks/useFieldState';
import { isFieldFilled, isUrlValid } from '../../../../../services/validation';
import { useValidationTimer } from '../../../../../hooks/useValidationTimer';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { Notify } from '../../../../../services/toast';
import { isNil } from 'lodash';
import { useActions } from '../../../../../hooks/useActions';

const ProfilePage: React.FC = () => {
  const {editProfileAsync} = useActions();
  const {user} = useTypedSelector((state) => state.userStore);

  const [avatarUri, setAvatarUri, avatarUriValid] = useFieldState(user?.avatarUrl);
  const onAvatarUriChange: InputChangeHandler = (e) => {
    setAvatarUri(e.target.value);
  }

  const [firstName, setFirstName, firstNameValid] = useFieldState(user?.firstname);
  const onFirstNameChange: InputChangeHandler = (e) => {
    setFirstName(e.target.value);
  }

  const [lastName, setLastName, lastNameValid] = useFieldState(user?.lastname);
  const onLastNameChange: InputChangeHandler = (e) => {
    setLastName(e.target.value);
  }
  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isUrlValid(avatarUri) || isNil(avatarUri) || avatarUri === "")
      avatarUriValid.current = true;
    else
      avatarUriValid.current = false;
    console.log(avatarUri);
    if (isFieldFilled(firstName))
      firstNameValid.current = true;
    else
      firstNameValid.current = false;

    if (isFieldFilled(lastName))
      lastNameValid.current = true;
    else
      lastNameValid.current = false;

    const allFieldsValid = avatarUriValid.current && firstNameValid.current && lastNameValid.current;
    if (!allFieldsValid) {
      Notify.error("Пожалуйста, проверьте поля.");
      startTimer();
    }
    return allFieldsValid;
  }

  const onSaveProfileClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validation()) {
      editProfileAsync(firstName, lastName, avatarUri);
    }
  }

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = DEFAULT_IMAGE;
    event.currentTarget.className = "error";
  };
  return (
    <div id="settings_profile_page">
      <div className='header'>
        Профиль пользователя
      </div>
      <div className='content'>
        <div className='personal_data_wrapper'>
          <div className='personal_data_header'>
            Личные данные
          </div>
          <div className='personal_data_content'>
            <div className='input_wrapper'>
              <FloatInput
                label="Email"
                value={user?.email || ""}
                onChange={() => {}}
                isFilled={true}
                />
            </div>
            <div className='avatar_wrapper'>
              <img src={avatarUri ?? DEFAULT_IMAGE} alt="avatar" onError={imageOnErrorHandler}/>
            </div>
            <div className='input_wrapper'>
              <FloatInput
                label="Ссылка на аватар"
                value={avatarUri || ""}
                onChange={onAvatarUriChange}
                isFilled={status || avatarUriValid.current}
                />
            </div>
            <div className='input_wrapper'>
              <FloatInput
                label="Имя"
                value={firstName || ""}
                onChange={onFirstNameChange}
                isFilled={status || firstNameValid.current}
                />
            </div>
            <div className='input_wrapper'>
              <FloatInput
                label="Фамилия"
                value={lastName || ""}
                onChange={onLastNameChange}
                isFilled={status || lastNameValid.current}
                />
            </div>
            <button onClick={onSaveProfileClick}>Сохранить профиль</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;