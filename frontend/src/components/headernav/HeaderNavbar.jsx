import React from "react";
import "../../App.css";
import "../navbar/Navbar";

function HeaderNavbar() {
  return (
    <div className="headerNavbar">
      <ul className="menu">
        <li>Général</li>
        <li>RH annonce</li>
        <li>Service</li>
        <button className="add-category" type="button">
          + Ajouter une categorie
        </button>
      </ul>
    </div>
  );
}

export default HeaderNavbar;
