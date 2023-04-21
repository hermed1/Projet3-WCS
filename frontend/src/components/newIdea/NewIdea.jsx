import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import fileIcon from "../../assets/file-icon.png";
import useApi from "../../services/useApi";

function NewIdea() {
  const api = useApi();

  const [titleIdea, setTitleIdea] = useState("");
  const [textIdea, setTextIdea] = useState("");
  const { user } = useUser();
  console.warn("coucou", user);

  const handleSubmitNewIdea = (e) => {
    e.preventDefault();
    const newIdea = {
      title: titleIdea,
      text: textIdea,
    };
    api
      .post("/idea", newIdea)
      .then((resp) => {
        console.warn(resp);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <section className="new-idea-section">
      <div className="new-idea-title-main">
        <h1>Nouvelle idée</h1>
      </div>
      <form onSubmit={handleSubmitNewIdea} className="form-newIdea">
        <div className="idea-section">
          <label htmlFor="title-edit">
            Titre :
            <input
              className="title-input"
              type="text"
              value={titleIdea}
              onChange={(e) => setTitleIdea(e.target.value)}
            />
          </label>
          <div className="idea-section-btn-div">
            <button type="button" className="idea-section-btn">
              Catégories
            </button>
            <button type="button" className="idea-section-btn">
              Sous-Catégories
            </button>
          </div>
        </div>

        <div className="idea-container">
          <h4>
            {user.firstname} {user.lastname}
          </h4>
          <input
            className="content-idea"
            type="text"
            placeholder=" Ecrivez votre idée ici..."
            value={textIdea}
            onChange={(e) => setTextIdea(e.target.value)}
          />
          <div className="add-file">
            <img src={fileIcon} alt="Logo fichier" className="img-add-file" />
            <p className="title-add-file">+ Ajouter un fichier</p>
          </div>
          <div className="post-idea">
            <button type="submit" className="post-idea-btn">
              Poster l'idée
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default NewIdea;
