import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import DeleteTeam from "./DeleteTeam";
import EditTeam from "./EditTeam";

function BrowseTeams() {
  const api = useApi();
  const [teamList, setTeamList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editTeam, setEditTeam] = useState(null);
  const [isDeleted, setIsdeleted] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    api
      .get(`/team/${user.companyId}`)
      .then((response) => {
        setTeamList(response.data);
      })
      .catch((err) => console.error(err));
  }, [isDeleted]);

  const handleClickSetEdit = (team) => {
    setEdit(true);
    setEditTeam(team);
  };

  const handleClickBack = () => {
    setEdit(false);
    setEditTeam(null);
  };

  return (
    <div>
      {edit && editTeam ? (
        <div>
          <EditTeam name={editTeam.name} id={editTeam.id} />
          <button type="button" onClick={handleClickBack}>
            Retour
          </button>
        </div>
      ) : (
        teamList.map((team) => (
          <div key={team.id}>
            <p>{team.name}</p>
            <button type="button" onClick={() => handleClickSetEdit(team)}>
              Modifier
            </button>
            <DeleteTeam id={team.id} setIsDeleted={setIsdeleted} />
          </div>
        ))
      )}
    </div>
  );
}
// BrowseTeams.propTypes = {};
export default BrowseTeams;
