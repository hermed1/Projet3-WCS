import React from "react";
import ListUser from "../components/userManager/ListUser";
import AddCompany from "./AddCompany";

function Entreprise() {
  return (
    <div>
      <h1>PAGE ENTREPRISE</h1>
      <ListUser />
      <AddCompany />
    </div>
  );
}

export default Entreprise;
