import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IoMdOpen } from "react-icons/io";
import AddTeam from "../components/teamManager/AddTeam";
import ListUser from "../components/userManager/ListUser";
import AddCompany from "./AddCompany";
import useApi from "../services/useApi";

function Entreprise() {
  const api = useApi();
  const companyId = useParams().id;
  const [company, setCompany] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [nSiret, setNSiret] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isFormModified, setIsFormModified] = useState(false);

  useEffect(() => {
    api
      .get(`/register/${companyId}`)
      .then((result) => {
        setCompany(result.data);
        setCompanyName(result.data.companyName);
        setNSiret(result.data.nSiret);
        setContactPerson(result.data.contactPerson);
        setEmail(result.data.email);
        setPhone(result.data.phone);
      })
      .catch((err) => console.error(err));
  }, []);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  const handleSubmitUpdateCompany = (e) => {
    e.preventDefault();
    const newCompany = {
      companyName,
      nSiret,
      contactPerson,
      email,
      phone,
    };
    api
      .put(`/register/${companyId}`, newCompany)
      .then((resp) => {
        console.warn(resp);
        setShowConfirmation(true);
      })
      .catch((err) => console.warn(err));
    setCompany(newCompany);
    setIsEditing(false);
  };

  useEffect(() => {
    if (showConfirmation) {
      const timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 1200);

      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [showConfirmation]);

  return (
    <div className="company">
      {showConfirmation && (
        <div className="confirmation-message">Modifications enregistrées</div>
      )}
      {isEditing ? (
        <div className="updateForm__container form ">
          <form
            method="post"
            name="add-company-form"
            onSubmit={handleSubmitUpdateCompany}
            className="form"
          >
            <label htmlFor="name" className="form__label">
              Nom entreprise
            </label>
            <input
              type="text"
              placeholder=" Nom entreprise"
              name="companyName"
              id="companyName"
              className="form__input"
              required
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setIsFormModified(true);
              }}
            />
            <label htmlFor="siret" className="form__label">
              SIRET
            </label>
            <input
              type="text"
              name="nSiret"
              id="nSiret"
              required
              placeholder=" SIRET"
              className="form__input"
              value={nSiret}
              onChange={(e) => {
                setNSiret(e.target.value);
                setIsFormModified(true);
              }}
            />
            <label htmlFor="contactPerson" className="form__label">
              Personne de contact
            </label>
            <input
              type="text"
              name="contactPerson"
              id="contactPerson"
              required
              className="form__input"
              placeholder="Nom de la personne de contact"
              value={contactPerson}
              onChange={(e) => {
                setContactPerson(e.target.value);
                setIsFormModified(true);
              }}
            />
            <label htmlFor="companyLogo" className="form__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email"
              className="form__input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsFormModified(true);
              }}
            />
            <label htmlFor="companyLogo" className="form__label">
              Téléphone
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="companyLogo"
              placeholder="Téléphone"
              required
              className="form__input"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setIsFormModified(true);
              }}
            />
            {isFormModified ? (
              <input type="submit" value="Modifier" className="form__submit" />
            ) : (
              ""
            )}
          </form>
          <button type="button" onClick={toggleEdit} className="form__submit">
            Retour
          </button>
        </div>
      ) : (
        <div className="company__global-container">
          <h1 className="company__pageTitle">{company.companyName}</h1>

          <section className="company__infos">
            <p className="company__item">
              <span className="company__item--underline"> SIRET : </span>
              {company.nSiret}
            </p>
            <p className="company__item">
              <span className="company__item--underline">
                Personne de contact :
              </span>
              {company.contactPerson}
            </p>
            <p className="company__item">
              <span className="company__item--underline">
                {" "}
                Adresse email :{" "}
              </span>
              {company.email}
            </p>
            <p className="company__item">
              <span className="company__item--underline"> Téléphone : </span>
              {company.phone}
            </p>
            <p className="company__item">
              <span className="company__item--underline">
                Date de création :
              </span>
              {company.creationDate}
            </p>
            {company.companyLogo ? <p>Logo: company.companyLogo </p> : null}
            <button
              type="button"
              className="company__update"
              onClick={toggleEdit}
            >
              Modifier
              <IoMdOpen className="company__update-icon" />
            </button>
            <div className="buttons-container">
              <button type="button" className="buttons-container-item">
                Ajouter un collaborateur
              </button>
              <button type="button" className="buttons-container-item">
                Idées archivées
              </button>
            </div>
          </section>
          <div className="company__users">
            <h2>Employés inscrits</h2>
            <ListUser />
          </div>
          <AddCompany />
          <AddTeam />
        </div>
      )}
    </div>
  );
}

export default Entreprise;
