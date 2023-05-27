import React from 'react';
import './settingsNavBarPage.scss';
import { Link, useLocation } from 'react-router-dom';
export const menuItems = [
  {
    key: "profile",
    iconSrc: "/assets/profile.png",
    alternativeText: "profile icon",
    text: "Профиль"
  },
  {
    key: "applications",
    iconSrc: "/assets/applications.png",
    alternativeText: "apps icon",
    text: "Приложения"
  },
  {
    key: "developer",
    iconSrc: "/assets/developer.png",
    alternativeText: "dev icon",
    text: "Настройки разработчика"
  },
];
const SettingsNavBarPage: React.FC = () => {
  const location = useLocation();
  const locationPathSplit = location.pathname.split('/');
  const currentSection = locationPathSplit[locationPathSplit.length - 1];
  return (
    <nav id='setting_nav_bar_container'>
      <div className='items'>
        {
          menuItems.map((item, index) => (
            <>
              <div className='item' key={item.key}>
                <Link to={`./${item.key}`} className={`open_menu ${currentSection === item.key && "selected"}`}>
                  <img src={item.iconSrc} alt={item.alternativeText}/>
                  {item.text}
                </Link>
              </div>
              {
                index !== menuItems.length - 1 
                ? <div className='line'/>            
                : null
              }
            </>
          ))
        }
      </div>
    </nav>
  );
}

export default SettingsNavBarPage;