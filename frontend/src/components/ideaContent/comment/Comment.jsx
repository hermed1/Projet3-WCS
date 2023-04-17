import React from "react";
import likeBtn from "../../../assets/like-btn.png";
import speechBubble from "../../../assets/speech-bubble.png";
import editBtn from "../../../assets/edit-button.png";

function Comment() {
  return (
    <div className="comment-container">
      <div className="head-title-content">
        <h4>Nom de l'utilisateur</h4>
        <button className="edit-btn" type="button">
          <img src={editBtn} alt="Logo edit" className="edit-img" />
        </button>
      </div>

      <p className="text-comment">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
        molestias nihil ab minima perspiciatis a, fugit dicta, incidunt harum
        quisquam dolores! Sint sit quibusdam accusamus reiciendis perspiciatis
        consequatur. Sapiente, alias.
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
    </div>
  );
}

export default Comment;
