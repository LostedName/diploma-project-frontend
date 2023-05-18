import React, { useRef, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useFieldState } from '../../hooks/useFieldState';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useValidationTimer } from '../../hooks/useValidationTimer';
import { isFieldFilled } from '../../services/validation';
import { ButtonClickEvent, InputChangeHandler } from '../../types/types';
import { EditProfileType } from '../../types/User';
import FloatInput from '../UI/FloatInput/FloatInput';
import './editProfilePopup.scss';

interface IPopup {
  closePopup: () => void;
}

const EditProfilePopup: React.FC<IPopup> = ({closePopup}) => {
  const user = useTypedSelector((state) => state.userStore.user);
  
  const {editProfile} = useActions();

  const [name, setName, nameValid] = useFieldState(user?.name);
  const onNameChange: InputChangeHandler = (e) => {
    setName(e.target.value);
  }
  const [description, setDescription, descriptionValid] = useFieldState(user?.description);
  const onDescriptionChange: InputChangeHandler = (e) => {
    setDescription(e.target.value);
  }
  const [avatar, setAvatar, avatarValid] = useFieldState(user?.avatar ?? "");
  const onAvatarChange: InputChangeHandler = (e) => {
    setAvatar(e.target.value);
  }
  const [profileCover, setProfileCover, profileCoverValid] = useFieldState(user?.profileCover ?? "");
  const onProfileCoverChange: InputChangeHandler = (e) => {
    setProfileCover(e.target.value);
  }
  const [country, setCountry, countryValid] = useFieldState(user?.country ?? "");
  const onCountryChange: InputChangeHandler = (e) => {
    setCountry(e.target.value);
  }
  const [link, setLink, linkValid] = useFieldState(user?.link ?? "");
  const onLinkChange: InputChangeHandler = (e) => {
    setLink(e.target.value);
  }
  const [birthDate, setBirthDate, birthDateValid] = useFieldState(user?.birthDate ?? "");
  const onBirthChange: InputChangeHandler = (e) => {
    setBirthDate(e.target.value);
  }
  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isFieldFilled(name))
      nameValid.current = true;
    else
      nameValid.current = false;

    startTimer();
    const allFieldsValid = nameValid.current;
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
        name,
        description: description?.trim() || null,
        country: country?.trim() || null,
        link: link?.trim() || null,
        birthDate: birthDate?.trim() || null,
        avatar: avatar?.trim() || null,
        profileCover: profileCover?.trim() || null,
      };
      editProfile(bodyObj);
      closePopup();
    }
  }
  return (
    <div className="edit-profile-container">
      <span>Edit profile:</span>
      <div className="input-wrapper">
        <FloatInput label="Name" value={name} onChange={onNameChange} isFilled={status || nameValid.current} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="Description" value={description} onChange={onDescriptionChange} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="Avatar" value={avatar} onChange={onAvatarChange} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="Profile cover" value={profileCover} onChange={onProfileCoverChange} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="Country" value={country} onChange={onCountryChange} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="Link" value={link} onChange={onLinkChange} />
      </div>
      <div className="input-wrapper">
        <FloatInput label="Birth date" value={birthDate} onChange={onBirthChange} />
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