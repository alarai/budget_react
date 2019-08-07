import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
      <Link className="navbar-brand" to="/">
        Budget
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExample09"
        aria-controls="navbarsExample09"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample09">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <NavLink className="nav-item nav-link" to="/">
              Current <span class="sr-only">(current)</span>
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/history">
              History
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/graphics">
              Graphics
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/recuring">
              Recuring Operations
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/categories">
              Operation Categories
            </NavLink>
          </li>
          <li class="nav-item">
            <NavLink className="nav-item nav-link" to="/types">
              Operation Types
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
