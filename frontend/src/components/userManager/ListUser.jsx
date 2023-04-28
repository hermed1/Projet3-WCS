import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";

function ListUser() {
  const [users, setUsers] = useState([]);

  const api = useApi();
  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        console.warn(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [api]);

  return (
    <div className="user-list-container">
      <h2>Liste d'utilisateurs</h2>
      <div className="user-list-cards">
        <Link to="/User/Add">Ajouter utilisateur</Link>
        <div className="user-list-row">
          {users.map((user) => (
            <div key={user.id} className="user-list-card">
              <div className="user-card-image-container">
                <img
                  className="user-list-card-image"
                  src={user.profilePicture}
                  alt="ProfilePic"
                />
              </div>
              <div className="user-list-card-details">
                <div className="user-list-card-name">
                  {user.firstname} {user.lastname}
                </div>
                <div className="user-list-card-email">{user.email}</div>
                <div className="user-list-card-dob">
                  Date de naissance:{" "}
                  {new Date(user.dateOfBirth).toLocaleDateString("fr-FR")}
                </div>
                <Link to={`/User/${user.id}`}>Modifier</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListUser;
