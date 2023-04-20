import React from "react";
import { useUser } from "../../contexts/UserContext";
import likeBtn from "../../assets/like-btn.png";
import speechBubble from "../../assets/speech-bubble.png";
import editBtn from "../../assets/edit-button.png";
import Comment from "./comment/Comment";

function IdeaContent() {
  const { user } = useUser();

  return (
    <section className="new-idea-section">
      <div className="idea-section">
        <h1 className="idea-title">Nom de l'idée</h1>
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
        <div className="head-title-content">
          <h4>
            {user.firstname} {user.lastname}
          </h4>
          <button className="edit-btn" type="button">
            <img src={editBtn} alt="Logo edit" className="edit-img" />
          </button>
        </div>

        <p className="text-idea">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          molestias nihil ab minima perspiciatis a, fugit dicta, incidunt harum
          quisquam dolores! Sint sit quibusdam accusamus reiciendis perspiciatis
          consequatur. Sapiente, alias. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Laboriosam, reprehenderit fuga. Reprehenderit omnis
          ut, expedita quasi accusamus neque aliquam pariatur fugit, vero
          tenetur ducimus eum ex saepe eveniet aut voluptas.
        </p>

        <div className="like-comment-div">
          <div className="like-div">
            <button className="like-btn" type="button">
              <p className="like-count">12</p>
              <img src={likeBtn} alt="Cœur" className="heart" />
            </button>
          </div>
          <div className="add-comment-div">
            <button className="add-comment-btn" type="button">
              <p className="comment-count">0</p>
              <img
                src={speechBubble}
                alt="Logo commentaire"
                className="speech-bubble"
              />
              <p className="add-comment">+ Commentaire</p>
            </button>
          </div>
        </div>

        <div className="archive-idea">
          <button type="button" className="archive-idea-btn">
            Archiver l'idée
          </button>
        </div>
      </div>

      <section className="comment-section">
        <h3 className="comment-main-title">Commentaires :</h3>

        <div className="comment__list">
          <Comment />
        </div>
      </section>
    </section>
  );
}

export default IdeaContent;
