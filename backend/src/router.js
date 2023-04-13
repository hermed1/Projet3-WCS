const express = require("express");

const router = express.Router();

// const { hashPassword, verifyPassword } = require("./utils/auth");

const loginControllers = require("./controllers/loginControllers");

router.post("/login", loginControllers.findByEmailToNext);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", userControllers.edit);
router.post("/user", userControllers.add);
router.delete("/user/:id", userControllers.destroy);

const ideaControllers = require("./controllers/ideaControllers");

router.get("/idea", ideaControllers.browse);
router.get("/idea/:id", ideaControllers.browse);
router.put("/idea/:id", ideaControllers.edit);
router.post("/idea", ideaControllers.add);
router.delete("/idea/:id", ideaControllers.destroy);

module.exports = router;
