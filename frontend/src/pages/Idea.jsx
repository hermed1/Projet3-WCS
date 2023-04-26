import { useEffect, useState } from "react";
import useApi from "../services/useApi";
import IdeaList from "../components/ideaContent/IdeaList";
import HeaderNavbar from "../components/headernav/HeaderNavbar";
import { useIdea } from "../contexts/IdeaContext";

function Idea() {
  const { idea, setIdea } = useIdea();
  const api = useApi();
  const [valide, setValide] = useState(false);

  useEffect(() => {
    api
      .get(`/idea`)
      .then((resp) => {
        setIdea(resp.data);
        setValide(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <HeaderNavbar />
      <IdeaList ideas={idea} setIdeas={setIdea} valide={valide} />
    </div>
  );
}

export default Idea;
