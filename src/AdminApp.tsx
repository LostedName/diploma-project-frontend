import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';
import {defaultRoutes, unloggedRoutes, loggedRoutes} from './routes/adminRoutes';
import './styles/app.scss';
import AdminHeader from './components/adminHeader/AdminHeader';
import LoadingScreen from './components/loadingScreen/LoadingScreen';
import { useActions } from './hooks/useActions';

function AdminApp() {
  const isAuth = useTypedSelector((state) => state.adminStore.isAuth);
  const isAppLoading = useTypedSelector((state) => state.adminStore.isAppLoading);
  const {loadAdminAsync} = useActions();
  useEffect(() => {
    loadAdminAsync();
  }, []);
  return (
    isAppLoading ? <LoadingScreen />
    :
    <>
      {
        isAuth && <AdminHeader />
      }
      <Routes>
        {
          (isAuth) ?
          loggedRoutes.map((route) => {
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
    </>
  );
}

export default AdminApp;
