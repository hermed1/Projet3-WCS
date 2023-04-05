const AbstractManager = require("./AbstractManager");

class LoginManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }
  /*findByLogin(login){
    return this.database.query (
      `SELECT * FROM ${this.table} WHERE login = ?`,
      [login]
    );
  }*/

  insert(user) {
    return this.database.query(
      `insert into  ${this.table} (email, password) values (?,?)`,
      [user.email, user.password]
    );
  }
}

module.exports = LoginManager;
