import React from "react";
import "./ProfileSettings.scss";
import { Navbar } from "../navbar/Navbar";
import { Header } from "../../header/Header";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../../utils/useInput";

type ProfileSettingsType = {};

export const ProfileSettings = ({}: ProfileSettingsType) => {
  const navigate = useNavigate();

  const firstName = useInput("firstName");
  const lastName = useInput("lastName");
  const avatarUrl = useInput("");

  return (
    <>
      <Header>
        <h3 onClick={() => navigate("/notes")} className="home">
          Заметки
        </h3>
      </Header>
      <div className="settingsWrapper">
        <Navbar />
        <div className="settings">
          <div className="title">Редактирование профиля</div>
          <div className="formBlock">
            <span className="label">Имя *</span>
            <input type="text" value={firstName.value} onChange={firstName.onChange} />
          </div>
          <div className="formBlock">
            <span className="label">Фамилия *</span>
            <input type="text" value={lastName.value} onChange={lastName.onChange} />
          </div>
          <div className="formBlock">
            <span className="label">Аватар URL</span>
            <input type="text" value={avatarUrl.value} onChange={avatarUrl.onChange} />
          </div>
          <button>Сохранить</button>
        </div>
      </div>
    </>
  );
};
