import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../App.css";
import { useUser } from "../../contexts/UserContext";
import Logout from "../logout/Logout";

function Navbar() {
  const navRef = useRef();
  const user = useUser();
  const { companyId } = user.user;

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <nav ref={navRef}>
        <li>
          <Link to={`/register/${companyId}`}>ENTREPRISE</Link>
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
      <Logout />
    </header>
  );
}

export default Navbar;
