import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import NewIdea from "../newIdea/NewIdea";

function IdeaList({ ideas, setIdeas, valide }) {
  const [showNewIdea, setShowNewIdea] = useState(false);
  const { state } = useLocation();

  const handleClickShowNewIdea = () => {
    setShowNewIdea(true);
  };

  const handleClick = (idea) => {
    setIdeas(idea);
  };

  const showArchivedIdeas = state ? state.showArchivedIdeas : false;
  const isArchived = showArchivedIdeas
    ? ideas.filter((item) => item.archived === 1)
    : ideas.filter((item) => item.archived === 0);

  return (
    <div className="idea-list">
      {!showArchivedIdeas && (
        <div>
          {showNewIdea ? (
            <NewIdea />
          ) : (
            <button
              className="btn-new-idea"
              type="button"
              onClick={handleClickShowNewIdea}
            >
              Nouvelle idée
            </button>
          )}
        </div>
      )}

      <section className="idea-list-content">
        {valide &&
          isArchived.map((item) => (
            <Link className="idea-list-content__link" to={`/idea/${item.id}`}>
              <img
                src=""
                alt="Illustration"
                className="idea-list-content__img-idea"
              />
              <button
                className="idea-list-content__btn"
                type="button"
                onClick={() => handleClick(item)}
              >
                {item.title}
              </button>
            </Link>
          ))}
      </section>
    </div>
  );
}

IdeaList.propTypes = {
  ideas: PropTypes.string.isRequired,
  setIdeas: PropTypes.func.isRequired,
  valide: PropTypes.bool.isRequired,
};

export default IdeaList;
