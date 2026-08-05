const express = require("express");
const AuthController = require("./src/controllers/AuthController");

const app = express();

app.use(express.json());

app.get("/login", AuthController.login);

app.get("/register", AuthController.register);

app.listen(3000);
