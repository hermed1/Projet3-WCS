import React from "react";
import PropTypes from "prop-types";
import likeBtn from "../../../assets/like-btn.png";
import speechBubble from "../../../assets/speech-bubble.png";
import editBtn from "../../../assets/edit-button.png";

function Comment({ text, createDate, firstname, lastname }) {
  return (
    <div className="comment-container">
      <div className="head-title-content">
        <h4>
          {firstname} {lastname}
        </h4>
        <button className="edit-btn" type="button">
          <img src={editBtn} alt="Logo edit" className="edit-img" />
        </button>
      </div>

      <p className="text-comment">
        {text}
        <br />
        Date de création :{" "}
        {new Date(createDate).toLocaleString("fr-FR", {
          timeZone: "UTC",
        })}
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

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
};

export default Comment;
