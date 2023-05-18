import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import './adminHeader.scss';

const AdminHeader: React.FC = () => {
  const isAuth = useTypedSelector((state) => state.adminStore.isAuth);
  const {logoutAdmin} = useActions();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logoutAdmin();
    navigate("/");
  } 

  return (
    <header className="admin_header">
      <div className="leftside">
        <Link className="logo" to="/users">
            <img src="/assets/logo_icon.png" alt="gramboo logo" />
            <span>Crow</span>
        </Link>
        {isAuth && <>
          <Link to="/users">Users</Link>
          <Link to="/banlist">Banlist</Link>
          <Link to="/reported-posts">Reported posts</Link>
          <Link to="/deleted-posts">Deleted posts</Link>
        </>
        }
      </div>
      {isAuth && <div className="rightside">
        <button onClick={logoutHandler} className="profile_logout">
          Sign out
        </button>
      </div>
      }
    </header>
  ); 
}

export default AdminHeader;