import { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import "./Register.css";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [validLogin, setValidLogin] = useState(false);
  const [success, setSuccess] = useState(false);
  const api = useApi();
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

  useEffect(() => {
    const result = USER_REGEX.test(login);
    setValidLogin(result);
  }, [login]);

  useEffect(() => {
    const result = PWD_REGEX.test(pass1);
    setValidPwd(result);
    const match = pass1 === pass2;
    setValidMatch(match);
  }, [pass1, pass2]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      firstname,
      name,
      login,
      password: pass1,
    };
    api
      .post("/user", newUser)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <div>
      {success ? (
        <section>OK, vous pouvez vous connecter</section>
      ) : (
        <form onSubmit={handleSubmit} className="form-signup">
          <label htmlFor="firstname" className="form-signup-label">
            Prénom :
            <input
              type="text"
              className="form-signup-input"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label htmlFor="name" className="form-signup-label">
            Nom :
            <input
              type="text"
              className="form-signup-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="login" className="form-signup-label">
            Login :
            <input
              type="text"
              autoComplete="off"
              className="form-signup-input"
              id="login"
              aria-invalid={validLogin ? "false" : "true"}
              aria-describedby="uidnote"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </label>
          <p
            id="uidnote"
            className={login && !validLogin ? "signup-invalid" : "signup-hide"}
          >
            Doit être entre 4 et 24 caractères et commencer par une lettre
          </p>
          <label htmlFor="pass1" className="form-signup-label">
            Mot de passe :
            <input
              type="text"
              className="form-signup-input"
              id="pass1"
              value={pass1}
              onChange={(e) => setPass1(e.target.value)}
            />
            <span
              className={validPwd || !pass1 ? "signup-hide" : "signup-invalid"}
            >
              Mot de passe invalide
            </span>
          </label>
          <label htmlFor="pass2" className="form-signup-label">
            Confirmer le mot de passe :
            <input
              type="password"
              className="form-signup-input"
              id="pass2"
              value={pass2}
              onChange={(e) => setPass2(e.target.value)}
            />
            <span
              className={
                validMatch || !pass2 ? "signup-hide" : "signup-invalid"
              }
            >
              Les mots de passes ne correspondent pas
            </span>
          </label>
          <button
            type="submit"
            className="form-signup-btn"
            disabled={
              !!(
                !validLogin ||
                !validPwd ||
                !validMatch ||
                firstname === "" ||
                name === ""
              )
            }
          >
            Valider
          </button>
        </form>
      )}
    </div>
  );
}

export default Register;
