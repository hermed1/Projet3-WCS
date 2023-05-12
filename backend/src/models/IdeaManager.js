const AbstractManager = require("./AbstractManager");

class IdeaManager extends AbstractManager {
  constructor() {
    super({ table: "idea" });
  }

  insert(title, text, companyId, pictureId) {
    return this.database.query(
      `insert into ${this.table} (title,
        text,
        companyId,
        pictureId) VALUES (?, ?, ?, ?)`,
      [title, text, companyId, pictureId]
    );
  }

  update(id, idee) {
    return this.database.query(
      `UPDATE ${this.table}
      SET text = ? WHERE id = ?`,
      [idee, id]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = IdeaManager;
