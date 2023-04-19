import React from "react";
import "./Enterprise.css";
// import useApi from "@services/useApi";

function Enterprise() {
  // const api = useApi();
  // const [raisonSociale, setRaisonSociale] = useState("");
  // const [siret, setSiret] = useState("");
  // const [companyLogo, setCompanyLogo] = useState("");
  // const [phone, setPhone] = useState("");
  // const [dirigeant, setdirigeant] = useState("");

  // const handleSubmit = (e) => {
  //   const newCompany = {
  //     raisonSociale,
  //     siret,
  //     phone,
  //     dirigeant,
  //   };
  //   e.preventdefault();
  //   api
  //     .post("/company", newCompany)
  //     .then((response) =>)
  //     .catch();
  // };
  return (
    <div>
      <form method="post" className="form">
        <label htmlFor="raisonSociale">Raison sociale</label>
        <input
          type="text"
          placeholder="Votre raison sociale"
          name="raisonSociale"
          id="raisonSociale"
          // onChange={(e) => setRaisonSociale(e.target.value)}
        />
        <label htmlFor="siret">Votre SIRET</label>
        <input
          type="text"
          name="siret"
          id="siret"
          placeholder="Votre numéro de SIRET"
          // onChange={(e) => setSiret(e.target.value)}
        />
        <label htmlFor="gestionnaire">Dirigeant</label>
        <input
          type="text"
          id="dirigeant"
          name="dirigeant"
          placeholder="Le nom du dirigeant"
          // onChange={(e) => setdirigeant(e.target.value)}
        />
        <label htmlFor="email">Votre email</label>
        <input type="email" id="email" name="email" placeholder="Votre email" />
        <label htmlFor="telephone">Votre téléphone</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          placeholder="Votre téléphone"
          // onChange={(e) => setPhone(e.target.value)}
        />
        {/* <label htmlFor="logo">Logo entreprise</label>
        <input type="file" id="logo" /> */}
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}

export default Enterprise;
