import React, { useState } from "react";
import PropTypes from "prop-types";
import useApi from "../../../services/useApi";

function CommentUpdate({ id, text, handleClickEdit, handleCommentUpdate }) {
  const api = useApi();
  const [updateTextComment, setUpdateTextComment] = useState(text);

  const handleUpdate = (e) => {
    e.preventDefault();
    let updateText = updateTextComment;

    if (!updateText.includes("(modifié)")) {
      updateText += " (modifié)";
    }

    api
      .put(`/comment/${id}`, { text: updateText })
      .then(() => {
        handleClickEdit();
        handleCommentUpdate();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    handleClickEdit();
  };

  return (
    <section className="new-idea-section">
      <form onSubmit={handleUpdate}>
        <div className="idea-container">
          <textarea
            className="content-idea"
            type="text"
            value={updateTextComment}
            onChange={(e) => setUpdateTextComment(e.target.value)}
          />

          <div className="archive-idea">
            <button
              type="button"
              className="archive-idea-btn"
              onClick={handleCancel}
            >
              Annuler
            </button>
            <button type="submit" className="archive-idea-btn">
              Modifier le commentaire
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

CommentUpdate.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleCommentUpdate: PropTypes.func.isRequired,
};

export default CommentUpdate;
