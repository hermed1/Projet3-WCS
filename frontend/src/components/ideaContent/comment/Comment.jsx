import React, { useState } from "react";
import PropTypes from "prop-types";
import { useUser } from "../../../contexts/UserContext";
import likeBtn from "../../../assets/like-btn.png";
import speechBubble from "../../../assets/speech-bubble.png";
import editBtn from "../../../assets/edit-button.png";
import CommentUpdate from "./CommentUpdate";

function Comment({
  id,
  text,
  createDate,
  firstname,
  lastname,
  autorId,
  handleCommentUpdate,
}) {
  const { user } = useUser();
  const [editContentComment, setEditContentComment] = useState(false);

  const handleClickEdit = () => {
    // Add restriction admin
    if (user.id === autorId) {
      setEditContentComment(!editContentComment);
    }
  };

  return (
    <div>
      {editContentComment ? (
        <CommentUpdate
          id={id}
          text={text}
          handleClickEdit={handleClickEdit}
          handleCommentUpdate={handleCommentUpdate}
        />
      ) : (
        <div className="comment-container">
          <div className="head-title-content">
            <h4>
              {firstname} {lastname}
            </h4>
            {user.id === autorId && (
              <button
                className="edit-btn"
                type="button"
                onClick={handleClickEdit}
              >
                <img src={editBtn} alt="Logo edit" className="edit-img" />
              </button>
            )}
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
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  createDate: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  autorId: PropTypes.number.isRequired,
  handleCommentUpdate: PropTypes.func.isRequired,
};

export default Comment;
