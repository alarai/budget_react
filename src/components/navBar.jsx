import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
      <Link className="navbar-brand" to="/">
        Budget
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {user && (
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/currents">
                Current <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/history">
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/graphics">
                Graphics
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle clickable"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Parameters
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdown">
                <NavLink className="dropdown-item" to="/recurings">
                  Recuring Operations
                </NavLink>

                <NavLink className="dropdown-item" to="/categories">
                  Operation Categories
                </NavLink>

                <NavLink className="dropdown-item" to="/types">
                  Operation Types
                </NavLink>
              </div>
            </li>

            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
