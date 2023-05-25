import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const api = useApi();
  const changedRoleId = 4;

  const handleUpdate = (userId) => {
    const roleToUpdate = {
      ...updatedUser,
      roleId: changedRoleId,
    };
    api
      .put(`/user/role/${userId}`, roleToUpdate)
      .then((res) => {
        console.warn(res);
        setUsers(users.filter((user) => user.id !== userId));
        setUserToDelete(null);
        setShowConfirmation(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const selectUserForUpdate = (user) => {
    setUpdatedUser(user);
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

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
    <div className="listUserContainer">
      <h2>Liste d'utilisateurs</h2>
      <Link to="/user/add" className="addUserButton">
        Ajouter un utilisateur
      </Link>
      <div className="listUserCards">
        <div className="listUserRow">
          {users.map((user) => (
            <div key={user.id} className="listUserCards">
              <div className="listUserCardImageContainer">
                <img
                  className="listUserCardImage"
                  src={user.profilePicture}
                  alt="ProfilePic"
                />
              </div>
              <div className="listUserCardDetails">
                <div className="listUserCardName">
                  {user.firstname} {user.lastname}
                </div>
                <Link
                  to={`/user/${user.id}`}
                  onClick={() => selectUserForUpdate(user)}
                >
                  Modifier
                </Link>
                <button
                  className="button"
                  name="roleId"
                  type="submit"
                  onClick={() => confirmDelete(user)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConfirmation && (
        <div className="deleteContainer">
          <div className="deleteConfirmation">
            <p>
              Voulez-vous vraiment supprimer l'utilisateur{" "}
              {userToDelete.firstname} {userToDelete.lastname} ?
            </p>
            <div className="deleteConfirmationButtons">
              <button
                type="submit"
                className="deleteConfirmationButton"
                value={updatedUser.roleId}
                onClick={() => handleUpdate(userToDelete.id)}
              >
                Oui
              </button>
              <button
                type="submit"
                className="deleteConfirmationButton"
                onClick={() => setShowConfirmation(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ListUser;
