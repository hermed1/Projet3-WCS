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
    creationDate,
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
      creationDate, roleId, teamId) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        firstname,
        lastname,
        email,
        dateOfBirth,
        hashedPassword,
        liked,
        profilePicture,
        creationDate,
        roleId,
        teamId,
      ]
    );
  }

  update(id, user) {
    return this.database.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [
      user,
      id,
    ]);
  }

  findByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
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
}

module.exports = UserManager;
