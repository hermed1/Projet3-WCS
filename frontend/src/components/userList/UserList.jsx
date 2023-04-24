import React, { useEffect, useState } from "react";
import useApi from "../../services/useApi";
import "./UserList.css";

function UserList() {
  const api = useApi();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        console.warn(res);
        setUserList(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <div className="userListContainer">
      {userList.map((user) => (
        <div key={user.id} className="userListItem">
          <div className="userDetails">
            <img src={user.profilePicture} alt="ProfilePic" />
            <div className="firstname">Prénom : {user.firstname}</div>
            <div className="nom">Nom : {user.lastname}</div>
            <div className="email">Email : {user.email}</div>
            <div className="dateOfBirth">
              Date de naissance: {user.dateOfBirth}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
