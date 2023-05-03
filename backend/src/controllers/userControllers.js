const joi = require("joi");
const models = require("../models");

const validate = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  return joi
    .object({
      id: joi.number().integer().presence("optional"),
      firstname: joi.string().max(45).presence(presence),
      lastname: joi.string().max(45).presence(presence),
      email: joi.string().max(45).presence(presence),
      dateOfBirth: joi.date().presence(presence),
      hashedPassword: joi.string().max(255).presence(presence),
      liked: joi.number().integer().allow(null).allow("").presence("optional"),
      profilePicture: joi
        .string()
        .max(255)
        .allow(null)
        .allow("")
        .presence("optional"),
      creationDate: joi.date().presence("optional").allow(null).allow(""),
      roleId: joi.number().integer().presence(presence),
      teamId: joi.number().integer().presence(presence),
    })
    .validate(data, { abortEarly: false }).error;
};

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
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

const edit = async (req, res) => {
  console.warn(req.body);
  const errors = validate(req.body, false);
  if (errors) {
    console.warn(errors);
    res.status(422).send({ errors });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const {
    firstname,
    lastname,
    email,
    dateOfBirth,
    profilePicture,
    roleId,
    teamId,
  } = req.body;
  models.user
    .update(
      id,
      firstname,
      lastname,
      email,
      dateOfBirth,
      profilePicture,
      roleId,
      teamId
    )
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

// eslint-disable-next-line consistent-return
const add = (req, res) => {
  const errors = validate(req.body);
  if (errors) return res.sendStatus(422);
  console.warn(errors);
  const {
    firstname,
    lastname,
    email,
    dateOfBirth,
    hashedPassword,
    liked,
    profilePicture,
    roleId,
    teamId,
  } = req.body;
  models.user
    .insert(
      firstname,
      lastname,
      email,
      dateOfBirth,
      hashedPassword,
      liked,
      profilePicture,
      roleId,
      teamId
    )
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err.errno === 1062) {
        res.status(409).send("User already exists");
      } else {
        console.error(err);
        res.sendStatus(500);
      }
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
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

const findByEmailToNext = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findByEmail(email)
    .then(([result]) => {
      if (result[0] != null) {
        // eslint-disable-next-line prefer-destructuring
        req.user = result[0];
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  findByEmailToNext,
};
