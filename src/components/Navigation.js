import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/add" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/add">
                  Add Workout Details
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/view" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/view">
                  View Workout Details
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);