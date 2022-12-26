import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="chat-navbar">
      <nav className="chat-navbar-inner">
        <div className="chat-navbar-inner-left">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-primary"
          >
            Back
          </button>
          <Link to="/settings" className="btn btn-outline-success ml-2">
            Settings
          </Link>
        </div>
        <div className="chat-navbar-inner-right">
          <span className="logged-in-user">Hi User</span>
          <Link to="/" className="btn btn-outline-success ml-2">
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
