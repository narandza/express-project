const router = require("express").Router();
const AuthController = require("../../src/controllers/AuthController");

router.post("/auth/login", AuthController.login);
router.post("/users", AuthController.register);

module.exports = router;
