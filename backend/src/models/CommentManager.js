const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    super({ table: "commentary" });
  }

  insertUserAutor(userId, idComment) {
    return this.database.query(
      `INSERT INTO usercommentary (
          postCreator, commentarytaryId, userId
        ) VALUES (1, ?, ?)`,
      [idComment, userId]
    );
  }

  //  add (req, res)  {
  //   const { text, ideaCommentaryId, userId } = req.body;
  //   const data = { text, ideaCommentaryId };
  //   const error = validate(data);

  //   if (error) {
  //     res.status(422).send({ error });
  //     return;
  //   }

  //   models.comment
  //     .insert(text, ideaCommentaryId)
  //     .then(([result]) => {
  //       // Recupérer le last insert idea, user id
  //       // enregistrer ces infos dans usercommentary
  //       models.comment
  //         .insertUserAutor(userId, result.insertId)
  //         .then(() => {
  //           res.location(`/items/${result.insertId}`).sendStatus(201);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           res.sendStatus(500);
  //         });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       res.sendStatus(500);
  //     });
  // };

  // insert(text, ideaCommentId) {
  //   return this.database.query(
  //     `insert into ${this.table} (
  //       text,
  //       ideaCommentaryId) VALUES (?, ?)`,
  //     [text, ideaCommentId]
  //   );
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
