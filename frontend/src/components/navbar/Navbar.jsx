import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../App.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <nav ref={navRef}>
        <li>
          <Link to="/">ENTREPRISE</Link>
        </li>
        <li>
          <Link to="/Idea">IDEE</Link>
        </li>
        <li>
          <Link to="/Profil">MON PROFIL</Link>
        </li>
        <button
          type="button"
          className="nav-btn nav-close-btn"
          onClick={showNavbar}
        >
          <FaTimes />
        </button>
      </nav>
      <button type="button" className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      <div className="search-container">
        <input type="search" placeholder="Recherche" className="search" />
      </div>
    </header>
  );
}

export default Navbar;
