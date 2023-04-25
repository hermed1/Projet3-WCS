import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const api = useApi();

  const handleLogout = () => {
    delete api.defaults.headers.authorization;
    setUser(null);
    navigate("/");
  };

  return (
    <div className="logout-button">
      <button type="submit" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
