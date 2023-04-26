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

const commentControllers = require("./controllers/commentControllers");

router.get("/comment", commentControllers.browse);
router.get("/comment/:id", commentControllers.read);
router.put("/comment/:id", commentControllers.edit);
router.post("/comment", commentControllers.add);
router.delete("/comment/:id", commentControllers.destroy);

const companyControllers = require("./controllers/companyControllers");

router.get("/register", companyControllers.browse);
router.get("/register/:id", companyControllers.read);
router.put("/register/:id", companyControllers.edit);
router.post("/register", companyControllers.add);
router.delete("/register/:id", companyControllers.destroy);

module.exports = router;
