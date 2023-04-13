const AbstractManager = require("./AbstractManager");

class IdeaManager extends AbstractManager {
  constructor() {
    super({ table: "idea" });
  }

  insert(title, text, createDate, companyId, pictureId) {
    return this.database.query(
      `insert into ${this.table} (title,
        text,
        createDate,
        companyId,
        pictureId) VALUES (?, ?, ?, (SELECT id FROM company WHERE id = ?), (SELECT id FROM picturestorage WHERE id = ?))`,
      [title, text, createDate, companyId, pictureId]
    );
  }

  update(item) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [item.title, item.id]
    );
  }
}

module.exports = IdeaManager;
