import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Comment from "./comment/Comment";
import IdeaUpdate from "./IdeaUpdate";
import editBtn from "../../assets/edit-button.png";
import likeBtn from "../../assets/like-btn.png";
import speechBubble from "../../assets/speech-bubble.png";
import useApi from "../../services/useApi";

function IdeaContent() {
  const api = useApi();
  const { user } = useUser();
  const { id } = useParams();
  const [comment, setComment] = useState([]);
  const [detailsIdea, setDetailsIdea] = useState({});
  const [editContent, setEditContent] = useState(false);
  const [refreshComment, setRefreshComment] = useState(false);
  const [textComment, setTextComment] = useState("");
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    api
      .get(`/idea/${id}`)
      .then((resp) => {
        setDetailsIdea(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .get(`/idea/${id}/comment`)
      .then((resp) => {
        setComment(resp.data);
        setTotalComments(resp.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refreshComment]);

  const handleSubmitNewComment = (e) => {
    e.preventDefault();
    const newComment = {
      text: textComment,
      ideaCommentaryId: detailsIdea.id,
      userId: user.id,
    };
    api
      .post("/comment", newComment)
      .then((resp) => {
        setComment([...comment, resp.data]);
        setTextComment("");
        setRefreshComment(!refreshComment);
      })
      .catch((err) => console.warn(err));
  };
  // console.log(detailsIdea);
  const handleClickEdit = () => {
    setEditContent(!editContent);
  };

  return (
    <section className="new-idea-section">
      <div className="idea-section">
        <h1 className="idea-title">{detailsIdea.title}</h1>
        <div className="idea-section-btn-div">
          <button type="button" className="idea-section-btn">
            Catégories
          </button>
          <button type="button" className="idea-section-btn">
            Sous-Catégories
          </button>
        </div>
      </div>

      {editContent ? (
        <IdeaUpdate
          detailsIdea={detailsIdea}
          setDetailsIdea={setDetailsIdea}
          handleClickEdit={handleClickEdit}
        />
      ) : (
        <div className="idea-container">
          <div className="head-title-content">
            <h4>
              {detailsIdea.firstname} {detailsIdea.lastname}
            </h4>
            <button
              className="edit-btn"
              type="button"
              onClick={handleClickEdit}
            >
              <img src={editBtn} alt="Logo edit" className="edit-img" />
            </button>
          </div>

          <p className="text-idea">
            {detailsIdea.text}
            <br />
            Date de création :{" "}
            {new Date(detailsIdea.createDate).toLocaleString("fr-FR", {
              timeZone: "UTC",
            })}
          </p>

          <div className="like-comment-div">
            <div className="like-div">
              <button className="like-btn" type="button">
                <p className="like-count">0</p>
                <img src={likeBtn} alt="Cœur" className="heart" />
              </button>
            </div>
            <div className="add-comment-div">
              <button className="add-comment-btn" type="button">
                <p className="comment-count">{totalComments}</p>
                <img
                  src={speechBubble}
                  alt="Logo commentaire"
                  className="speech-bubble"
                />
              </button>
            </div>
          </div>

          <div className="archive-idea">
            <button type="button" className="archive-idea-btn">
              Archiver l'idée
            </button>
          </div>
        </div>
      )}

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
              firstname={item.firstname}
              lastname={item.lastname}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

export default IdeaContent;
