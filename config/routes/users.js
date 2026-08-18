const router = require("express").Router();
const usersController = require("../../src/controllers/UserController");

router.get("/", usersController.getAll);
router.post("/users", usersController.register);

module.exports = router;
