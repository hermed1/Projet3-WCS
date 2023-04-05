const express = require("express");

const loginControllers = require("./controllers/loginControllers");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

router.post("/login", loginControllers.);
router.get("/login", loginControllers.browse);

module.exports = router;
