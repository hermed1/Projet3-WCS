import React, { useState } from "react";
import "./Enterprise.css";
import useApi from "../services/useApi";

function Enterprise() {
  const api = useApi();
  const [name, setName] = useState("");
  const [nSiret, setNSiret] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [creationDate, setCreationDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventdefault();
    const newCompany = {
      name,
      nSiret,
      creationDate,
      companyLogo,
    };
    e.preventdefault();
    api.post("/company", newCompany).then().catch();
  };
  return (
    <div>
      <form method="post" className="form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form__label">
          Name
        </label>
        <input
          type="text"
          placeholder="Your company name"
          name="name"
          id="name"
          className="form__input"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="siret" className="form__label">
          Votre SIRET
        </label>
        <input
          type="text"
          name="nSiret"
          id="nSiret"
          placeholder="Your SIRET number"
          className="form__input"
          onChange={(e) => setNSiret(e.target.value)}
        />
        <label htmlFor="creationDate">Company creation date</label>
        <input
          type="date"
          name="creationDate"
          id="creationDate"
          className="form__input"
          onChange={(e) => setCreationDate(e.target.value)}
        />
        <label htmlFor="companyLogo">Your company logo</label>
        <input
          type="text"
          id="companyLogo"
          name="companyLogo"
          onChange={(e) => setCompanyLogo(e.target.value)}
        />
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}

export default Enterprise;
