import React, {useEffect, useState} from 'react';
import './developerPage.scss';
import { useTypedSelector } from '../../../../../hooks/useTypedSelector';
import { useActions } from '../../../../../hooks/useActions';
import Portal from '../../../../../components/portal/Portal';
import CreateOAuthClientPopup from '../../../../../components/createOAuthClientPopup/CreateOAuthClientPopup';
import { ButtonClickEvent, DEFAULT_APPLICATION_IMAGE } from '../../../../../types/types';
import BounceLoader from '../../../../../components/bounceLoader/BounceLoader';

const DeveloperPage: React.FC = () => {
  const {clientsPage, clients, isContentLoading} = useTypedSelector((state) => state.oauthClientStore);
  const {getUserClientsAsync} = useActions();
  const [createOAuthClientPopup, setCreateOAuthClientPopup] = useState<boolean>(false);

  const createClientBtnClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    setCreateOAuthClientPopup(true);
  }

  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = DEFAULT_APPLICATION_IMAGE;
    event.currentTarget.className = "error";
  };

  useEffect(() => {
    getUserClientsAsync(clientsPage);
  }, [clientsPage]);
  return (
    <div id="settings_developer_page">
      <Portal isOpened={createOAuthClientPopup}>
        <CreateOAuthClientPopup closePopup={() => setCreateOAuthClientPopup(false)} />
      </Portal>
      <div className='header'>
        <div className='header_text'>
          OAuth 2.0 приложения
        </div>
        <button onClick={createClientBtnClick}>Создать</button>
      </div>
      <div className='content'>
        {
          isContentLoading ? 
          <div className='center_container'>
            <BounceLoader/>
          </div> : clients.length === 0 
            ? 
          <div className='center_container '>
            У вас пока нет ни одного приложения.
          </div> : 
          <>
          {
            clients.map((client) => (
              <div className='client_item'>
                <div className='logo_container'>
                  <img src={client.icon_url || DEFAULT_APPLICATION_IMAGE} alt="app logo" onError={imageOnErrorHandler} />
                </div>
                <span className='name'>{client.name}</span>
                <span className='description'>{client.description}</span>
              </div>
            ))
          }
          </>
        }
      </div>
    </div>
  );
}

export default DeveloperPage;