import { useEffect, useState } from "react";
import useApi from "../../services/useApi";

function AddUser() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  // const [creationDate, setCreationDate] = useState("");
  const [role, setRole] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [team, setTeam] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  // const [validEmail, setValidEmail] = useState(false);
  const [success, setSuccess] = useState(false);
  const api = useApi();
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  // const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

  // useEffect(() => {
  //   const result = USER_REGEX.test(email);
  //   setValidEmail(result);
  // }, [email]);

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
      lastname,
      email,
      dateOfBirth,
      password: pass1,
      // creationDate,
      role,
      team,
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
        <section>Utilisateur crée </section>
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
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label htmlFor="email" className="form-signup-label">
            Email :
            <input
              type="text"
              autoComplete="off"
              className="form-signup-input"
              id="email"
              // aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {/* <p
            id="uidnote"
            className={email && !validEmail ? "signup-invalid" : "signup-hide"}
          >
            Doit être entre 4 et 24 caractères et commencer par une lettre
          </p> */}
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
            <label htmlFor="profilePicture" className="form-signup-label">
              profilePicture :
              <input
                type="text"
                className="form-signup-input"
                id="profilePicture"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
              />
            </label>
            <label htmlFor="dateOfBirth" className="form-signup-label">
              Date de naissance:
              <input
                type="date"
                className="form-signup-input"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </label>
          </label>
          <label htmlFor="role" className="form-signup-label">
            Rôle :
            <input
              type="text"
              className="form-signup-input"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <label htmlFor="team" className="form-signup-label">
            Équipe :
            <input
              type="text"
              className="form-signup-input"
              id="team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
          </label>
          {/* <label htmlFor="creationDate" className="form-signup-label">
            Date d'inscription:
            <input
              type="date"
              className="form-signup-input"
              id="creationDate"
              value={
                creationDate ? creationDate.split("-").reverse().join("-") : ""
              }
              onChange={(e) => setCreationDate(e.target.value)}
            />
          </label> */}
          <button
            type="submit"
            className="form-signup-btn"
            // disabled={
            //   !!(
            //     // !validEmail ||
            //     (
            //       !validPwd ||
            //       !validMatch ||
            //       firstname === "" ||
            //       lastname === "" ||
            //       email === "" ||
            //       password == "" ||

            //     )
            //   )
            // }
          >
            Ajouter
          </button>
        </form>
      )}
    </div>
  );
}

export default AddUser;
