import React from "react";
import "./DevelopersSettings.scss";
import { Navbar } from "../navbar/Navbar";
import { Header } from "../../header/Header";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../../utils/useModal";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/store";
import { AddModal } from "./addModal/AddModal";

type DevSettingsType = {};

export const DevelopersSettings = ({}: DevSettingsType) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isModalOpen, toggleModal } = useModal();
  const apps = useAppSelector((state) => state.OAuthApps);

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
          <div className="title">
            <span>OAuth приложения</span>
            <button onClick={toggleModal}>New OAuth App</button>
          </div>
          {apps.length ? (
            apps.map((app) => (
              <div className="application">
                <img src="/images/app.svg" alt="app" />
                <div className="appDescription">
                  <span>{app.name}</span>
                  <span>{app.description}</span>
                </div>
              </div>
            ))
          ) : (
            <h3>У вас нет OAuth приложений</h3>
          )}
        </div>
      </div>
      {isModalOpen && <AddModal toggleModal={toggleModal} />}
    </>
  );
};
