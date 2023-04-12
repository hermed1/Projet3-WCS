const AbstractManager = require("./AbstractManager");

class LoginManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }

  insert(user) {
    return this.database.query(
      `insert into  ${this.table} (email, password) values (?,?)`,
      [user.email, user.password]
    );
  }
}

module.exports = LoginManager;
