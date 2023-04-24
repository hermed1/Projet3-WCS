import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../services/useApi";
import AddUser from "../components/addUser/AddUser";
import UserList from "../components/userList/UserList";

function Entreprise() {
  const api = useApi();
  const companyId = useParams().id;
  const [company, setCompany] = useState({});
  useEffect(() => {
    api
      .get(`/register/${companyId}`)
      .then((result) => setCompany(result.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="company">
      <h1 className="company__pageTitle">Informations entreprise</h1>
      <section className="company__infos">
        <h2 className="company__item">
          {" "}
          <span className="company__span">Nom entreprise:</span>{" "}
          {company.companyName}
        </h2>
        <p className="company__item"> SIRET: {company.nSiret}</p>
        <p className="company__item">
          Personne de contact: {company.contactPerson}
        </p>
        <p className="company__item"> Adresse email: {company.email}</p>
        <p className="company__item"> Téléphone: {company.phone}</p>
        <p className="company__item">
          Date de création: {company.creationDate}
        </p>
        {company.companyLogo ? <p>Logo: company.companyLogo </p> : null}
      </section>
      <AddUser />
      <UserList />
    </div>
  );
}

export default Entreprise;
