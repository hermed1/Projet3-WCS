import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";

function UserEdit() {
  const [updatedUser, setUpdatedUser] = useState([]);
  const api = useApi();
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    api
      .put(`/user/${updatedUser.id}`, updatedUser)
      .then((res) => {
        console.warn(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleInputChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => {
        setUpdatedUser(res.data);
        console.warn(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, [api]);

  return (
    <div className="editUserContainer">
      <h1>MODIFIER UTILISATEUR</h1>
      {success ? (
        <section className="editUserSection successMessage">
          Utilisateur mis à jour
        </section>
      ) : (
        <form className="editUserForm" onSubmit={handleUpdate}>
          <label htmlFor="firstname" className="editUserFormLabel">
            Prénom:
            <input
              type="text"
              className="editUserFormInput"
              name="firstname"
              value={updatedUser.firstname}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="lastname" className="editUserFormLabel">
            Nom:
            <input
              type="text"
              className="editUserFormInput"
              name="lastname"
              value={updatedUser.lastname}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="email" className="editUserFormLabel">
            Email:
            <input
              type="text"
              className="editUserFormInput"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="dateOfBirth" className="editUserFormLabel">
            Date de naissance:
            <input
              type="date"
              className="editUserFormInput"
              name="dateOfBirth"
              value={updatedUser.dateOfBirth}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="roleId" className="editFormLabel">
            Rôle:
            <select
              type="text"
              className="editUserFormInput"
              name="roleId"
              value={updatedUser.roleId}
              onChange={handleInputChange}
            >
              <option value="">--Choisir un rôle--</option>
              <option value="1">Administrateur</option>
              <option value="2">Utilisateur</option>
            </select>
          </label>
          <label htmlFor="teamId" className="editFormLabel">
            Équipe:
            <select
              type="text"
              className="editUserFormInput"
              name="teamId"
              value={updatedUser.teamId}
              onChange={handleInputChange}
            >
              <option value="">--Choisir une équipe--</option>
              <option value="1">Dev</option>
              <option value="2">Compabilité</option>
            </select>
          </label>
          <button
            className="editUserButton"
            type="submit"
            onClick={() => handleUpdate(updatedUser)}
          >
            Modifier
          </button>
        </form>
      )}
    </div>
  );
}

export default UserEdit;
