import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../services/useApi";

function IdeaUpdate({
  //   detailsUser,
  detailsIdea,
  setDetailsIdea,
  handleClickEdit,
}) {
  const api = useApi();
  const [updateTextIdea, setUpdateTextIdea] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    api
      .put(`/idea/${detailsIdea.id}`, { text: updateTextIdea })
      .then(() => {
        setDetailsIdea({ ...detailsIdea, text: updateTextIdea });
        handleClickEdit();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // console.log("user", detailsUser);
  // console.log("idea", detailsIdea);

  return (
    <section className="new-idea-section">
      <form onSubmit={handleUpdate}>
        <div className="idea-container">
          <textarea
            className="content-idea"
            type="text"
            placeholder=" Modifier votre idée ici..."
            value={updateTextIdea}
            onChange={(e) => setUpdateTextIdea(e.target.value)}
          />

          <div className="archive-idea">
            <button type="submit" className="archive-idea-btn">
              Modifier l'idée
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

IdeaUpdate.propTypes = {
  // detailsUser: PropTypes.func.isRequired,
  detailsIdea: PropTypes.func.isRequired,
  setDetailsIdea: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
};

export default IdeaUpdate;
