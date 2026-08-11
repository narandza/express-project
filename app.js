const express = require("express");
const AuthController = require("./src/controllers/AuthController");

const app = express();

app.use(express.json());

app.post("/login", AuthController.login);

app.post("/register", AuthController.register);

app.listen(3000);
