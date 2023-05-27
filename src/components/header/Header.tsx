import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { SearchBar } from "../UI";
import './header.scss';
import { DEFAULT_IMAGE } from "../../types/types";

const Header: React.FC = () => {
  const isAuth = useTypedSelector((state) => state.userStore.isAuth);
  const user = useTypedSelector((state) => state.userStore.user);
  const {logoutUser} = useActions();
  const navigate = useNavigate();
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const logoutHandler = () => {
    logoutUser();
    navigate("/");
  } 
  const openMenu = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpened(true);
  };
  const closeMenu = () => {setIsMenuOpened(false);};
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = DEFAULT_IMAGE;
    event.currentTarget.className = "error";
  };
  useEffect(() => {
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    }
  }, []);
  return (
    <header>
      <div className="leftside">
        <Link className="logo" to="/">
            <img src="/assets/logo_icon.png" alt="gramboo logo" />
            <span>Crow</span>
        </Link>
        {/* <SearchBar /> */}
      </div>
      {isAuth ? <div className="header_profile">
        <img src={user?.avatarUrl ?? DEFAULT_IMAGE} alt="avatar" onError={imageOnErrorHandler} />
        <span className="profile_name">
          {`${user?.firstname} ${user?.lastname}`}
        </span>
        <Link to="/settings" className="open_menu">
          <img src="/assets/cog.png"alt="settings"/>
        </Link>
        <button onClick={logoutHandler} className="profile_logout">
          Выход
        </button>
      </div>
      : <div>
        <Link to="/login" className="btn login_btn">Войти</Link>
        <Link to="/registration" className="btn register_btn">Зарегистрироваться</Link>
      </div>
      }
    </header>
  ); 
}

export default Header;