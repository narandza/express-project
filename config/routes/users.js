const router = require("express").Router();
const usersController = require("../../src/controllers/UserController");

router.get("/", usersController.getAll);

module.exports = router;
