const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "commentary" });
  }

  insert(text, ideaCommentId) {
    return this.database.query(
      `insert into ${this.table} ( 
        text,
        ideaCommentaryId) VALUES (?, ?)`,
      [text, ideaCommentId]
    );
  }

  // {
  //   "text": "zfa",
  //   "ideaCommentaryId": 1
  // }
  update(id, comment) {
    return this.database.query(
      `UPDATE ${this.table}
      SET ? WHERE id = ?`,
      [comment, id]
    );
  }

  delete(id) {
    return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
  }
}

module.exports = CommentManager;
