import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import backgroundImage from "../../assets/salesforce.jpeg";
import logoImage from "../../assets/salesforce-logo.png";

function Login({ handleLogin }) {
  const api = useApi();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const refEmail = useRef();
  const refPass = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const mail = refEmail.current.value;
    const pass = refPass.current.value;
    const user = {
      email: mail,
      password: pass,
    };
    api
      .post("/login", user)
      .then((resp) => {
        console.warn(resp);
        const { token } = resp.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(resp.data.user);
        handleLogin();
        navigate(`/register/${resp.data.user.companyId}`);
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
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    opacity: "0.8",
    position: "relative",
  };

  const logoStyle = {
    position: "absolute",
    top: "15%",
    left: "15%",
    transform: "translate(-50%, -50%)",
    width: "30vh",
    height: "auto",
  };

  return (
    <div style={containerStyle}>
      <img src={logoImage} alt="Logo" style={logoStyle} />
      <div className="loginFormContainer">
        <p className="loginTitle">Connexion</p>
        <form onSubmit={handleSubmit} className="loginForm">
          <label htmlFor="login" className="loginLabel">
            Email :
            <input type="text" className="inputLoginForm" ref={refEmail} />
          </label>
          <label htmlFor="password" className="loginLabel">
            Password :
            <input type="password" className="inputLoginForm" ref={refPass} />
          </label>
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
