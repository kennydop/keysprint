import React from "react";
import "./Header.css";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

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
          <img className="avatar" src={user?.photoURL} alt="User avatar" />
          <div
            className="logout"
            onClick={() => {
              logOut();
            }}
          >
            <p> Logout</p>
            <FontAwesomeIcon icon={faSignOut} />
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
