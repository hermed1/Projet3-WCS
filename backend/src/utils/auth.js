const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parrallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.hashedPassword, hashingOptions)
    .then((hashedPassword) => {
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyPassword = (req, res) => {
  console.warn(req.user);
  argon2
    .verify(req.user.password, req.body.password)
    // eslint-disable-next-line consistent-return
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: {
            id: req.user.id,
            email: req.user.email,
          },
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        delete req.user.password;
        res.send({ token, user: req.user });
      } else {
        return res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.warn(err);
      return res.sendStatus(500);
    });
};

// eslint-disable-next-line consistent-return
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (authorizationHeader === null || !authorizationHeader) {
      throw new Error("Authorization header is missing");
    }
    const [type, token] = authorizationHeader.split(" ");
    if (type !== "Bearer") {
      // eslint-disable-next-line no-undef
      throw newError("Authorization header has not the bearer type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.warn(err);
    return res.status(500);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
