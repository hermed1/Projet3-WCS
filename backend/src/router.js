const express = require("express");

const router = express.Router();

const { hashPassword, verifyPassword } = require("./utils/auth");

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/role/:id", userControllers.roleUpdate);
router.put("/user/:id", userControllers.edit);
router.post("/user", hashPassword, userControllers.add);
router.post("/login", userControllers.findByEmailToNext, verifyPassword);
router.delete("/user/:id", userControllers.destroy);

const ideaControllers = require("./controllers/ideaControllers");
const commentControllers = require("./controllers/commentControllers");

router.get("/idea", ideaControllers.browse);
router.get("/idea/:id", ideaControllers.read);
router.put("/idea/:id", ideaControllers.edit);
router.post("/idea", ideaControllers.add);
router.delete("/idea/:id", ideaControllers.destroy);

router.get("/idea/:id/comment/", commentControllers.browse);

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

const teamControllers = require("./controllers/teamControllers");

router.get("/team/:companyId", teamControllers.browse);
router.get("/team/:id", teamControllers.read);
router.put("/team/:id", teamControllers.edit);
router.post("/team", teamControllers.add);
router.delete("/team/:id", teamControllers.destroy);

module.exports = router;
