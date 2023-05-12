import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function DeleteTeam({ id }) {
  const [isTeamDeleted, setIsTeamDeleted] = useState(false);
  // récupération de l'id de la team à supprimer
  const teamId = id;
  const api = useApi();
  const handleDeleteTeam = () => {
    api
      .delete(`team/${teamId}`)
      .then((response) => {
        console.warn(response);
        setIsTeamDeleted(true);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <button type="button" onClick={handleDeleteTeam}>
        Supprimer une équipe
      </button>
      {isTeamDeleted ? <p>L'équipe a bien été supprimée</p> : ""}
    </div>
  );
}
DeleteTeam.propTypes = {
  id: PropTypes.number.isRequired,
};
export default DeleteTeam;
