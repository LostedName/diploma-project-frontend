import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

type SettingsPropsType = {};

export const Navbar = ({}: SettingsPropsType) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/settings/profile");
  };
  const navigateToDevelopers = () => {
    navigate("/settings/developers");
  };

  return (
    <div className="navbar">
      <span onClick={navigateToProfile}>Редактирование профиля</span>
      <span onClick={navigateToDevelopers}>Настройки разработчика</span>
    </div>
  );
};
