import React, { useState } from "react";
import axios from "axios";
import fileIcon from "../../assets/file-icon.png";

function NewIdea() {
  const url = import.meta.env.VITE_BACKEND_URL;

  const [newIdea, setNewIdea] = useState("");

  const handleClickpostIdea = () => {
    axios
      .post(`${url}/idea`, { newIdea })
      .then((response) => {
        setNewIdea(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className="new-idea-section">
      <div className="new-idea-title-main">
        <h1>Nouvelle idée</h1>
      </div>
      <div className="idea-section">
        <label htmlFor="title-edit">
          Titre : <input className="title-input" type="text" />
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
        <h4>Nom de l'utilisateur</h4>
        <input
          className="content-idea"
          type="text"
          placeholder=" Ecrivez votre idée ici..."
        />
        <div className="add-file">
          <img src={fileIcon} alt="Logo fichier" className="img-add-file" />
          <p className="title-add-file">+ Ajouter un fichier</p>
        </div>
        <div className="post-idea">
          <button
            type="button"
            className="post-idea-btn"
            onClick={handleClickpostIdea}
          >
            Poster l'idée
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewIdea;
