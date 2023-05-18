import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserApp from './UserApp';
import AdminApp from './AdminApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Application = () => {
  const subdomain = window.location.host.split(".")[0];
  return (
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position='top-right'
        newestOnTop
        closeOnClick
        autoClose={5000}
        hideProgressBar={false}
        pauseOnHover
      />
      <BrowserRouter>
        {
        subdomain === "admin" 
        ? <AdminApp />
        : <UserApp />
        }
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  );
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
