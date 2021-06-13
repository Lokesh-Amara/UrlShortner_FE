import React from "react";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();

  return (
    <nav
      className="navbar navbar-dark "
      style={{ backgroundColor: "#e3f2dd", textAlign: "left" }}
    >
      <div>
        <button className="btn" onClick={() => history.push("/")}>
          Home
        </button>
        <button className="btn" onClick={() => history.push("/url")}>
          My Urls
        </button>
      </div>
    </nav>
  );
}
