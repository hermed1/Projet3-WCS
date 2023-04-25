const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  insert(title, text, companyId, pictureId) {
    return this.database.query(
      `insert into ${this.table} (title,
        text,
        companyId,
        pictureId) VALUES (?, ?, (SELECT id FROM company WHERE id = ?), (SELECT id FROM picturestorage WHERE id = ?))`,
      [title, text, companyId, pictureId]
    );
  }

  update(id, idee) {
    return this.database.query(
      `UPDATE ${this.table}
      SET ? WHERE id = ?`,
      [idee, id]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CommentManager;
