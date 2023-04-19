const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword } = require("./utils/auth");

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);

router.put("/user/:id", hashPassword, userControllers.edit);

router.post("/user", hashPassword, userControllers.add);
router.post("/login", userControllers.findByEmailToNext, verifyPassword);

router.delete("/user/:id", userControllers.destroy);

const ideaControllers = require("./controllers/ideaControllers");

router.get("/idea", ideaControllers.browse);
router.get("/idea/:id", ideaControllers.read);
router.put("/idea/:id", ideaControllers.edit);
router.post("/idea", ideaControllers.add);
router.delete("/idea/:id", ideaControllers.destroy);

module.exports = router;
