import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

export const Header: React.FC = () => {
  return (
    <header className="py-4">
      <div className="w-full px-5 flex justify-between items-center">
        <Link to="/">
          <img src={logo} className="w-16" alt="HostPod" />
        </Link>
        <span className="text-xs">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} className="text-3xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};
