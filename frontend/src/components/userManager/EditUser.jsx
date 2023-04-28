import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";

function UserEdit() {
  const [updatedUser, setUpdatedUser] = useState([]);
  const api = useApi();
  const { id } = useParams();
  const handleUpdate = (e) => {
    e.preventDefault();
    api
      .put(`/user/${updatedUser.id}`, updatedUser)
      .then((res) => {
        console.warn(res);
        // setSuccess(true);
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
    <div>
      <form className="update-user-form" onSubmit={handleUpdate}>
        <label htmlFor="firstname">Prénom:</label>
        <input
          type="text"
          name="firstname"
          value={updatedUser.firstname}
          onChange={handleInputChange}
        />
        <label htmlFor="lastname">Nom:</label>
        <input
          type="text"
          name="lastname"
          value={updatedUser.lastname}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={updatedUser.email}
          onChange={handleInputChange}
        />
        <label htmlFor="dateOfBirth">Date de naissance:</label>
        <input
          type="date"
          name="dateOfBirth"
          value={updatedUser.dateOfBirth}
          onChange={handleInputChange}
        />
        <label htmlFor="roleId">Rôle:</label>
        <input
          type="text"
          name="roleId"
          value={updatedUser.roleId}
          onChange={handleInputChange}
        />
        <label htmlFor="teamId">Équipe:</label>
        <input
          type="text"
          name="teamId"
          value={updatedUser.teamId}
          onChange={handleInputChange}
        />
        <button
          className="update-user-button"
          type="submit"
          onClick={() => handleUpdate(updatedUser)}
        >
          Modifier
        </button>
      </form>
    </div>
  );
}

export default UserEdit;
