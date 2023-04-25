import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function Logout() {
  const { setUser } = useUser();
  const api = useApi();

  const handleLogout = () => {
    api.defaults.headers.authorization = `Bearer ${""}`;
    setUser(null);
    window.location.reload(false);
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
