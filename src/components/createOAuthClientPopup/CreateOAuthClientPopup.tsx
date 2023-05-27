import React from 'react';
import { ButtonClickEvent, InputChangeHandler } from '../../types/types';
import './createOAuthClientPopup.scss';
import PopupBackground from '../PopupBackground/PopupBackground';
import FloatInput from '../UI/FloatInput/FloatInput';
import { useFieldState } from '../../hooks/useFieldState';
import { useValidationTimer } from '../../hooks/useValidationTimer';
import { isFieldFilled, isUrlValid } from '../../services/validation';
import { useActions } from '../../hooks/useActions';

interface IPopup {
  closePopup: () => void;
}

const CreateOAuthClientPopup: React.FC<IPopup> = ({closePopup}) => {
  const {createUserClientAsync, setContentIsLoadingAction} = useActions();
  //name description homepageUrl redirectUrls
  const [name, setName, nameValid] = useFieldState("");
  const onNameChange: InputChangeHandler = (e) => {
    setName(e.target.value);
  }
  const [content, setContent, contentValid] = useFieldState("");
  const onContentChange: InputChangeHandler = (e) => {
    setContent(e.target.value);
  }
  const [homePageUrl, setHomePageUrl, homePageUrlValid] = useFieldState("");
  const onHomePageUrlChange: InputChangeHandler = (e) => {
    setHomePageUrl(e.target.value);
  }
  const [redirecteUri, setRedirecteUri, redirecteUriValid] = useFieldState("");
  const onRedirectUriChange: InputChangeHandler = (e) => {
    setRedirecteUri(e.target.value);
  }

  
  const {status, startTimer} = useValidationTimer();
  const validation: () => boolean = () => {
    if (isFieldFilled(name))
      nameValid.current = true;
    else
      nameValid.current = false;

    if (isFieldFilled(content))
      contentValid.current = true;
    else
    contentValid.current = false;

    if (isFieldFilled(homePageUrl) && isUrlValid(homePageUrl))
      homePageUrlValid.current = true;
    else
      homePageUrlValid.current = false;

    if (isFieldFilled(redirecteUri) && isUrlValid(redirecteUri))
      redirecteUriValid.current = true;
    else
      redirecteUriValid.current = false;

    const allFieldsValid = nameValid.current && contentValid.current && homePageUrlValid.current && redirecteUriValid.current;
    if (!allFieldsValid) {
      startTimer();
    }
    return allFieldsValid;
  }

  const onClosePopup = () => {
    setName("");
    setContent("");
    closePopup();
  }
  const onBackClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    closePopup();
  }
  const onSumbitClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    // editPost(id.current, text, type);
    if (validation()) {
      setContentIsLoadingAction(true);
      createUserClientAsync(name, content, homePageUrl, [redirecteUri], closePopup);
    }
  }
  return (
    <PopupBackground closePopup={onClosePopup}>
      <form className="create_oauth_client_popup_container" onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
        <h1>Создание приложения OAuth 2.0</h1>
        <FloatInput
          label="Название приложения"
          value={name}
          onChange={onNameChange}
          isFilled={status || nameValid.current}
          />
        <FloatInput
          label="Описание приложения"
          value={content}
          onChange={onContentChange}
          isFilled={status || contentValid.current}
          />
        <FloatInput
          label="Ссылка на главную страницу"
          value={homePageUrl}
          onChange={onHomePageUrlChange}
          isFilled={status || homePageUrlValid.current}
          />
        <FloatInput
          label="Ссылка перенаправления"
          value={redirecteUri}
          onChange={onRedirectUriChange}
          isFilled={status || homePageUrlValid.current}
          />
        <div className="buttons">
          <button onClick={onSumbitClick}>
            Создать
          </button>
          <button onClick={onBackClick}>
            Назад
          </button>
        </div>
      </form>
    </PopupBackground>
  );
};

export default CreateOAuthClientPopup;