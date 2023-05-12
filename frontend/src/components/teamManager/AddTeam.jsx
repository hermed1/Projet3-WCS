import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";

function AddTeam() {
  const api = useApi();
  const { user } = useUser();
  const [newTeam, setNewTeam] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [creationConfirmation, setCreationConfirmation] = useState(false);

  const toggleInput = () => {
    setInputVisible(!inputVisible);
  };

  const handleSetNewTeam = (e) => {
    setNewTeam(e.target.value);
  };

  const registerNewTeam = () => {
    const team = {
      companyId: user.companyId,
      name: newTeam,
    };
    api
      .post("/team", team)
      .then((response) => {
        console.warn(response);
        setCreationConfirmation(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (creationConfirmation) {
      const timer = setTimeout(() => {
        setCreationConfirmation(false);
      }, 1700);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [creationConfirmation]);

  return (
    <div>
      <button type="button" onClick={toggleInput}>
        Ajouter une équipe
      </button>
      {inputVisible ? (
        <div>
          <label htmlFor="newTeam">Ajouter une nouvelle équipe</label>
          <input
            type="text"
            name="newTeam"
            id="newTeam"
            placeholder="Nom de la nouvelle équipe"
            onChange={handleSetNewTeam}
          />
          <button type="button" onClick={registerNewTeam}>
            Enregistrer
          </button>
        </div>
      ) : null}
      {creationConfirmation ? <p>Equipe créée</p> : ""}
    </div>
  );
}

export default AddTeam;
