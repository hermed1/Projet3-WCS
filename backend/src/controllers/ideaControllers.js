const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().min(0).presence("optional"),
      title: joi.string().max(120).presence(presence),
      text: joi.string().max(4000).presence(presence),
      createDate: joi.date().presence("optional").allow(null).allow(""),
      companyId: joi.number().min(0).presence("optional"),
      pictureId: joi.number().min(0).presence("optional"),
      ideaId: joi.number().min(0).presence("optional"),
      userId: joi.number().min(0).presence("optional"),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.idea
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.send(500);
    });
};

const read = (req, res) => {
  models.idea
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const error = validate(req.body, false);
  if (error) {
    res.status(422).send({ error });
    return;
  }

  const id = parseInt(req.params.id, 10);
  const { text } = req.body;

  models.idea
    .update(id, text)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const { title, text, companyId, pictureId, userId } = req.body;
  const data = { title, text, companyId, pictureId };
  const error = validate(data);

  if (error) {
    res.status(422).send({ error });
    return;
  }

  models.idea
    .insert(title, text, companyId, pictureId)
    .then(([result]) => {
      const newIdeaId = result.insertId;

      models.idea
        .insertUserAutorIdea(newIdeaId, userId, result.insertId)
        .then(() => {
          res.status(201).send({ id: newIdeaId });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);

  models.idea
    .delete(id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
