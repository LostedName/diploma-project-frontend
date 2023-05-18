import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { SearchBar } from "../UI";
import './header.scss';

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
        <img src={user?.avatar ?? "/assets/unknown_user.png"} alt="avatar" />
        <span className="profile_name">
          {user?.name}
        </span>
        <button onClick={openMenu} className="open_menu">
          <div />
          <div />
          <div />
          <div className={`profile_menu ${isMenuOpened ? "active" : ""}`}>
            <Link to="/profile">Your profile</Link>
            <Link to="/follows">Your follows</Link>
            <Link to="/subscribers">Your subscribers</Link>
            {/* <Link to="/settings">Settings</Link> */}
          </div>
        </button>
        <button onClick={logoutHandler} className="profile_logout">
          Sign out
        </button>
      </div>
      : <div>
        <Link to="/login" className="btn login_btn">Log In</Link>
        <Link to="/registration" className="btn register_btn">Register</Link>
      </div>
      }
    </header>
  ); 
}

export default Header;