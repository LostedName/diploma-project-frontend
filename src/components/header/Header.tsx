import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

type HeaderPropsType = {
  children?: React.ReactNode;
};

export const Header = ({ children }: HeaderPropsType) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      {children}
      <div className="profile">
        <img src="/images/avatar.png" alt="avatar" />
        <div>
          <span className="name">firstName lastName</span>
          <div className="links">
            <span onClick={() => navigate("/settings/profile")}>Настройки</span>
            <span onClick={() => navigate("/login")}>Выйти</span>
          </div>
        </div>
      </div>
    </div>
  );
};
