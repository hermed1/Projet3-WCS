import { useState, useContext, createContext, useMemo } from "react";
import PropTypes from "prop-types";

const IdeaContext = createContext(null);

function IdeaProvider({ children }) {
  const [idea, setIdea] = useState();
  const [comment, setComment] = useState([]);
  const value = useMemo(
    () => ({ idea, setIdea, comment, setComment }),
    [idea, setIdea, comment, setComment]
  );

  return <IdeaContext.Provider value={value}>{children}</IdeaContext.Provider>;
}

IdeaProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useIdea = () => useContext(IdeaContext);

export default IdeaProvider;
