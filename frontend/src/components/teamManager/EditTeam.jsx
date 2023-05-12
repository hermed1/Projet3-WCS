import React from "react";
import PropTypes from "prop-types";

function EditTeam({ name, id }) {
  return (
    <div>
      nom: {name} id: {id}
    </div>
  );
}

EditTeam.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default EditTeam;
