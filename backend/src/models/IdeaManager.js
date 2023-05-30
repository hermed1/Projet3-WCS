const AbstractManager = require("./AbstractManager");

class IdeaManager extends AbstractManager {
  constructor() {
    super({ table: "idea" });
  }

  findByUser(id) {
    return this.database.query(
      `SELECT i.*, u.id AS userId, u.firstname, u.lastname FROM ${this.table} i
      INNER JOIN useridea ui
      ON i.id = ui.ideaId
      INNER JOIN user u
      ON ui.userId = u.id
      WHERE i.id = ?
      AND ui.postCreator = 1
      `,
      [id]
    );
  }

  insert(title, text, companyId, pictureId, archived) {
    return this.database.query(
      `insert into ${this.table} (title,
        text,
        companyId,
        pictureId, archived) VALUES (?, ?, ?, ?, ?)`,
      [title, text, companyId, pictureId, archived]
    );
  }

  insertUserAutorIdea(ideaId, userId) {
    return this.database.query(
      `INSERT INTO useridea (
          liked, postCreator, ideaId, userId
        ) VALUES (0, 1, ?, ?)`,
      [ideaId, userId]
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
    return this.database.query(
      `DELETE FROM ${this.table} 
      WHERE id = ?`,
      [id]
    );
  }
}

module.exports = IdeaManager;
