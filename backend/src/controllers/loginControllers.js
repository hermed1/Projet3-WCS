const models = require("../models");

const findByEmailToNext = (req, res, next) => {
  const { email } = req.body;
  models.login
    .findByEmail(email)
    .then(([result]) => {
      if (result[0]) {
        if (result[0] != null) {
          return res.sendStatus(200);
        }
        next();
      }
      return res.sendStatus(401);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  findByEmailToNext,
};
