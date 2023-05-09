import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import NewIdea from "../newIdea/NewIdea";

function IdeaList({ ideas, setIdeas, valide }) {
  const [showNewIdea, setShowNewIdea] = useState(false);

  const handleClickShowNewIdea = () => {
    setShowNewIdea(true);
  };

  const handleClick = (idea) => {
    setIdeas(idea);
  };

  return (
    <div>
      {showNewIdea ? (
        <NewIdea />
      ) : (
        <button
          className="new-idea"
          type="button"
          onClick={handleClickShowNewIdea}
        >
          Nouvelle idée
        </button>
      )}
      <section className="idea-list-content">
        {valide &&
          ideas.map((item) => (
            <Link to={`/idea/${item.id}`} key={item.id} idea={ideas}>
              <button
                className="idea-btn"
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
