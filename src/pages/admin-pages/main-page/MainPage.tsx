import React, {FC} from 'react';
import './mainPage.scss';
const MainPage: FC = () => {
  return (
    <main className="admin_main_page">
      <div className='statistics'>
        <h1>Statistics</h1>
        <div className='stat_row'>Count of users: <span>124</span></div>
        <div className='stat_row'>Count of posts(all time): <span>124</span></div>
        <div className='stat_row'>Count of posts today: <span>124</span></div>
      </div>
    </main>
  );
}

export default MainPage;