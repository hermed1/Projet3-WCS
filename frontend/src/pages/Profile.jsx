import React, { useState } from "react";
import AddTeam from "../components/teamManager/AddTeam";
import BrowseTeams from "../components/teamManager/BrowseTeams";

function Profile() {
  const [showTeams, setShowTeams] = useState(false);
  const handleClickSetShowTeams = () => {
    setShowTeams(!showTeams);
  };
  return (
    <div>
      <AddTeam />
      <button type="button" onClick={handleClickSetShowTeams}>
        {showTeams
          ? "Fermer la liste des équipes"
          : "Voir la liste des équipes"}
      </button>
      {showTeams ? <BrowseTeams show={showTeams} /> : ""}
    </div>
  );
}

export default Profile;
