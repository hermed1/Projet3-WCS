import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function DeleteTeam({ id, setIsDeleted }) {
  const [isTeamDeleted, setIsTeamDeleted] = useState(false);
  const teamId = id;
  const api = useApi();
  const handleDeleteTeam = () => {
    api
      .delete(`team/${teamId}`)
      .then((response) => {
        console.warn(response);
        setIsTeamDeleted(true);
        setIsDeleted(true);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (isTeamDeleted) {
      const timer = setTimeout(() => {
        setIsTeamDeleted(false);
      }, 1700);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [isTeamDeleted]);

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
  setIsDeleted: PropTypes.func.isRequired,
};
export default DeleteTeam;
