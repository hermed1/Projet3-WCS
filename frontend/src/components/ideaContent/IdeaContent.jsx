import { useEffect, useState } from "react";
import { useIdea } from "../../contexts/IdeaContext";
import { useUser } from "../../contexts/UserContext";
import useApi from "../../services/useApi";
import likeBtn from "../../assets/like-btn.png";
import speechBubble from "../../assets/speech-bubble.png";
import editBtn from "../../assets/edit-button.png";
import Comment from "./comment/Comment";

function IdeaContent() {
  const api = useApi();
  const { user } = useUser();
  const { idea, setIdea, comment, setComment } = useIdea();
  const [textComment, setTextComment] = useState("");

  useEffect(() => {
    api
      .get(`/idea/${idea.id}`)
      .then((resp) => {
        setIdea(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/idea/${idea.id}/comment`)
      .then((resp) => {
        setComment(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [comment]);

  const handleSubmitNewComment = (e) => {
    e.preventDefault();
    const newComment = {
      text: textComment,
      ideaCommentaryId: idea.id,
      userId: user.id,
    };
    api
      .post("/comment", newComment)
      .then((resp) => {
        setComment([...comment, resp.data]);
        setTextComment("");
      })
      .catch((err) => console.warn(err));
  };

  return (
    <section className="new-idea-section">
      <div className="idea-section">
        <h1 className="idea-title">{idea.title}</h1>
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
          {idea.text}
          <br />
          Date de création :{" "}
          {new Date(idea.createDate).toLocaleString("fr-FR", {
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

        <div className="archive-idea">
          <button type="button" className="archive-idea-btn">
            Archiver l'idée
          </button>
        </div>
      </div>

      <section className="comment-section">
        <h3 className="comment-main-title">Commentaires :</h3>

        <form onSubmit={handleSubmitNewComment} className="form-newComment">
          <input
            type="text"
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
            className="text-input"
          />
          <button type="submit" className="post-comment-btn">
            Ajouter un commentaire
          </button>
        </form>

        <div className="comment-list">
          {comment.map((item) => (
            <Comment
              key={item.id}
              text={item.text}
              createDate={item.createDate}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default IdeaContent;
