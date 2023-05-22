import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { useTypedSelector } from './hooks/useTypedSelector';
import './styles/app.scss';
import { useActions } from './hooks/useActions';
import LoadingScreen from './components/loadingScreen/LoadingScreen';
import { defaultRoutes, loggedRoutes, unloggedRoutes } from './routes/userRoutes';

//login if account not verified: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cGUiOjEsImlhdCI6MTY4NDY4MzcyNSwiZXhwIjoxNjg0Njg3MzI1fQ.zO3D6PpLFgajSop02i0LqTfwTtgXXJDJnIhdLjg5swQ
//confirm email token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInR5cGUiOjAsImlhdCI6MTY4NDcwNDk4MCwiZXhwIjoxNjg0NzA4NTgwfQ.KOiLICd9FgeD_J65BARGSA97KvqqXdX8pGjMbc8EH2A
//after confirmation: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsInR5cGUiOjIsImlhdCI6MTY4NDcwNTE0MiwiZXhwIjoxNjg0NzA4NzQyfQ.UPpqOuQ8mcEsdK9f5vCzzXsM1cCUCRC0vjYDVq2t5AE





function UserApp() {
  const {isAuth, isAppLoading, user} = useTypedSelector((state) => state.userStore);
  const {resolveUserStateAsync} = useActions();
  const navigate = useNavigate();
  useEffect(() => {
    resolveUserStateAsync(navigate);
  }, []);
  return (
    isAppLoading ? <LoadingScreen />
    :
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default UserApp;
