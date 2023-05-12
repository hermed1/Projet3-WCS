import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../services/useApi";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState([]);

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
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const selectUserForUpdate = (user) => {
    setUpdatedUser(user);
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
                {updatedUser !== null && (
                  <button
                    className="button"
                    name="roleId"
                    type="submit"
                    value={updatedUser.roleId}
                    onClick={() => handleUpdate(user.id)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListUser;
