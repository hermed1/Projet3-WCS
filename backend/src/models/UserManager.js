const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(
    firstname,
    lastname,
    email,
    dateOfBirth,
    hashedPassword,
    liked,
    profilePicture,
    roleId,
    teamId
  ) {
    return this.database.query(
      `insert into ${this.table} (firstname,
      lastname,
      email,
      dateOfBirth,
      hashedPassword,
      liked,
      profilePicture,
      roleId, teamId) VALUES (?, ?, ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`,
      [
        firstname,
        lastname,
        email,
        dateOfBirth,
        hashedPassword,
        liked,
        profilePicture,
        roleId,
        teamId,
      ]
    );
  }

  update(
    id,
    firstname,
    lastname,
    email,
    dateOfBirth,
    profilePicture,
    roleId,
    teamId
  ) {
    return this.database.query(
      `UPDATE user SET 
    firstname = ?,
    lastname = ?,
    email = ?,
    dateOfBirth = ?,
    profilePicture = ?,
    roleId = ?,
    teamId = ?
    WHERE id = ?`,
      [
        firstname,
        lastname,
        email,
        dateOfBirth,
        profilePicture,
        roleId,
        teamId,
        id,
      ]
    );
  }

  findByEmail(email) {
    return this.database.query(
      `SELECT user.id, firstname,
      lastname,
      email,
      dateOfBirth,
      hashedPassword,
      liked,
      profilePicture,
      creationDate,
      roleId,
      teamId,
      companyId
      FROM user, team 
      WHERE email = ? and user.teamId = team.id`,
      [email]
    );
  }

  findAll() {
    return this.database.query(`select id, firstname,
  lastname,
  email,
  dateOfBirth,
  liked,
  profilePicture,
  creationDate,
  roleId,
  teamId FROM  ${this.table}`);
  }

  updateRoleId(id, roleId) {
    return this.database.query(`UPDATE user SET roleId = ? WHERE id = ?`, [
      roleId,
      id,
    ]);
  }
}

module.exports = UserManager;
