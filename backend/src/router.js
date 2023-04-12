const express = require("express");

const router = express.Router();

// const { hashPassword, verifyPassword, verifyToken } = require("./utils/auth");

const { hashPassword, verifyPassword } = require("./utils/auth");

const loginControllers = require("./controllers/loginControllers");

router.post("/login", loginControllers.findByEmailToNext);

const userControllers = require("./controllers/userControllers");

router.get("/user", userControllers.browse);
router.get("/user/:id", userControllers.read);
router.put("/user/:id", hashPassword, userControllers.edit);
router.post("/user", hashPassword, userControllers.add);
router.delete("/user/:id", userControllers.destroy);

// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
