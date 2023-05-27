import React, {useEffect, useState, useRef} from 'react';
import './settingsPage.scss';
import { Link, Route, Routes } from 'react-router-dom';
import SettingsNavBarPage, { menuItems } from './components/settings-nav-bar/SettingsNavBarPage';
import RedirectPage from '../redirect-page/RedirectPage';
import ProfilePage from './components/profile-page/ProfilePage';
import ApplicationsPage from './components/applications-page/ApplicationsPage';
import DeveloperPage from './components/developer-page/DeveloperPage';

const SettingsPage: React.FC = () => {
  return (
    <main className="settings_page">
        <div className='header'>
          Настройки
        </div>
        <div className='content_area'>
          <div className='content_container'>
            <SettingsNavBarPage />
            <div className='main_content_wrapper'>
              <Routes>
                <Route path={`/${menuItems[0].key}`} element={<ProfilePage />}  />
                <Route path={`/${menuItems[1].key}`} element={<ApplicationsPage />}  />
                <Route path={`/${menuItems[2].key}`} element={<DeveloperPage />}  />
                <Route path={`/*`} element={<RedirectPage redirectPath={`/settings/${menuItems[0].key}`}/>}  />
              </Routes>
            </div>
          </div>
        </div>
    </main>
  );
}

export default SettingsPage;