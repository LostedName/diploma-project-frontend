import React from "react";
import "./App.scss";
import { Notes } from "./components/notes/Notes";
import { Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/login/LoginForm";
import { ProfileSettings } from "./components/settings/profile/ProfileSettings";
import { DevelopersSettings } from "./components/settings/developers/DevelopersSettings";

export const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <LoginForm
              pageTitle="Вход"
              buttonTitle="Войти"
              navLinkRoute="/registration"
              navLinkTitle="Зарегистрироваться"
              navLinkDescription="Впервые у нас?"
            />
          }
        />
        <Route path="notes" element={<Notes />} />
        <Route path="settings/profile" element={<ProfileSettings />} />
        <Route path="settings/developers" element={<DevelopersSettings />} />
        <Route
          path="login"
          element={
            <LoginForm
              pageTitle="Вход"
              buttonTitle="Войти"
              navLinkRoute="/registration"
              navLinkTitle="Зарегистрироваться"
              navLinkDescription="Впервые у нас?"
            />
          }
        />
        <Route
          path="registration"
          element={
            <LoginForm
              pageTitle="Регистрация"
              buttonTitle="Зарегистрироваться"
              navLinkRoute="/login"
              navLinkTitle="Войти"
              navLinkDescription="Есть аккаунт?"
            />
          }
        />
      </Routes>
    </div>
  );
};
