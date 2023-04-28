import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useApi from "../../services/useApi";
import EditUser from "../../pages/UserEditPage";

function ListUser() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [success, setSuccess] = useState(false);
  const api = useApi();
  const { id, firstname, lastname, email, dateOfBirth, roleId, teamId } =
    useParams();
  useEffect(() => {
    setUpdatedUser({
      id,
      firstname,
      lastname,
      email,
      dateOfBirth,
      roleId,
      teamId,
    });
  }, [id, firstname, lastname, email, dateOfBirth, roleId, teamId]);
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
  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setUpdatedUser(user);
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    api
      .put(`/user/${selectedUser.id}`, updatedUser)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  return (
    <div className="user-list-container">
      {success ? (
        <section className="user-list-success">Utilisateur mis à jour </section>
      ) : (
        <div className="user-list-cards">
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
                    Date de naissance: {user.dateOfBirth}
                  </div>
                  <Link
                    to={`/user/${user.id}`}
                    onClick={() => handleUserSelection(user)}
                  >
                    Modifier
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {selectedUser && (
            <EditUser
              user={selectedUser}
              updateUser={handleUpdate}
              updatedUser={updatedUser}
              handleInputChange={handleInputChange}
              handleUserSelection={handleUserSelection}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ListUser;
