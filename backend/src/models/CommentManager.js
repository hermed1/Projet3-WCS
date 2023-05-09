const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "commentary" });
  }

  findAllbyIdea(id) {
    return this.database.query(
      `
    SELECT c.*, u.lastname, u.firstname FROM ${this.table} c
    INNER JOIN usercommentary uc 
    ON c.id = uc.commentarytaryId
    INNER JOIN user u 
    ON uc.userId = u.id
    WHERE ideaCommentaryId = ?
    AND postCreator = 1`,
      [id]
    );
  }

  insertUserAutor(userId, idComment) {
    return this.database.query(
      `INSERT INTO usercommentary (
          postCreator, commentarytaryId, userId
        ) VALUES (1, ?, ?)`,
      [idComment, userId]
    );
  }

  update(id, comment) {
    return this.database.query(
      `UPDATE ${this.table}
          SET ? WHERE id = ?`,
      [comment, id]
    );
  }

  delete(id) {
    return this.database.query(
      `DELETE FROM ${this.table} 
    WHERE id = ?`,
      [id]
    );
  }
}

module.exports = CommentManager;
