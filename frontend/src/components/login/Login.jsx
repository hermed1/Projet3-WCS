import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import backgroundImage from "../../assets/salesforce.jpeg";

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
        navigate("/");
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
  const style = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    opacity: "0.8",
  };

  return (
    <div style={style}>
      <h2 className="loginTitle">Connexion</h2>
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
  );
}

//   return (
//     <div className="loginContainer">
//       <h2 className="loginTitle">Connexion</h2>
//       <form onSubmit={handleSubmit} className="loginForm">
//         <label htmlFor="login" className="loginLabel">
//           Email :
//           <input type="text" className="inputLoginForm" ref={refEmail} />
//         </label>
//         <label htmlFor="password" className="loginLabel">
//           Password :
//           <input type="password" className="inputLoginForm" ref={refPass} />
//         </label>
//         <button type="submit">Connexion</button>
//       </form>
//     </div>
//   );
// }

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
