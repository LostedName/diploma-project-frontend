import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useTypedSelector } from './hooks/useTypedSelector';
import {defaultRoutes, unloggedRoutes, loggedRoutes, bannedRoutes} from './routes/userRoutes';
import './styles/app.scss';
import { useActions } from './hooks/useActions';
import LoadingScreen from './components/loadingScreen/LoadingScreen';

function UserApp() {
  const {isAuth, isAppLoading, user} = useTypedSelector((state) => state.userStore);
  const {loadUserAsync} = useActions();
  console.log(user);
  useEffect(() => {
    loadUserAsync();
  }, []);
  return (
    isAppLoading ? <LoadingScreen />
    :
    <>
      <Header />
      <Routes>
        {
          (isAuth) ?
            user?.isBanned ? bannedRoutes.map((route) => {
              const Element: React.FC = route.element;
              return <Route path={route.path} element={<Element/>}/>;
            })
            : loggedRoutes.map((route) => {
              const Element: React.FC = route.element;
              return <Route path={route.path} element={<Element/>}/>;
            })
          : unloggedRoutes.map((route) => {
            const Element: React.FC = route.element;
            return <Route path={route.path} element={<Element/>}/>;
          })
        }
        {
          defaultRoutes.map((route) => {
            const Element: React.FC = route.element;
            return <Route path={route.path} element={<Element/>}/>;
          })
        }
      </Routes>
      <Footer />
    </>
  );
}

export default UserApp;
