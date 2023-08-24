import React from "react";
import "./Header.css";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";

function Header() {
  const { user, logOut } = useUser();
  return (
    user && (
      <header className="header">
        <Link to="/">
          <div className="header-title">keysprint_</div>
        </Link>
        <div className="profile">
          <span className="user-name">{user?.displayName}</span>
          <img
            onClick={() => {
              logOut();
            }}
            className="avatar"
            src={user?.photoURL}
            alt="User avatar"
          />
        </div>
      </header>
    )
  );
}

export default Header;
