import { useRef } from "react";
// import { useNavigate } from "react-dom";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import "./Login.css";

function Login() {
  const api = useApi();
  const { setUser } = useUser();
  const refEmail = useRef();
  const refPass = useRef();
  // const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = refEmail.current.value;
    const pass = refPass.current.value;
    // controle des valeurs.
    const user = {
      email: mail,
      password: pass,
    };
    api
      .post("/login", user)
      .then((resp) => {
        console.warn(resp);
        // eslint-disable-next-line no-shadow
        const { token, user } = resp.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(user);
        // navigate("/");
      })
      .catch((err) => {
        console.warn(err);
        let errorMsg = "";
        switch (err?.response?.status) {
          case 401:
            errorMsg = "Vous n'êtes pas autorisé à vous connecter";
            break;
          case 404:
            errorMsg = "Utilisateur inexistant";
            break;
          case 422:
            errorMsg = "Erreur dans les données fournies";
            break;
          default:
            errorMsg = "Erreur serveur";
        }
        // eslint-disable-next-line no-alert
        alert(errorMsg);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Connexion</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="login" className="login-label">
          Login :
          <input type="text" className="input-login-form" ref={refEmail} />
        </label>
        <label htmlFor="password" className="login-label">
          Password :
          <input type="password" className="input-login-form" ref={refPass} />
        </label>
        <button type="submit"> Connexion </button>
      </form>
    </div>
  );
}

export default Login;
