const express = require("express");

const router = express.Router();
// const multer = require("multer");
// const path = require("path");

// const uploadFolder = path.join(__dirname, "public", "assets");
// const upload = multer({ dest: uploadFolder });

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

const companyControllers = require("./controllers/companyControllers");

router.get("/company", companyControllers.browse);
router.get("/company/:id", companyControllers.read);
router.put("/company/:id", companyControllers.edit);
router.post("/company", companyControllers.add);
router.delete("/company/:id", companyControllers.destroy);

module.exports = router;
