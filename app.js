const express = require("express");
const UserService = require("./src/services/userService");
const prismaStatusCodes = require("./config/prismaStatusCodes");
const userService = require("./src/services/userService");

const app = express();

app.use(express.json());

app.get("/login", async (req, res) => {
  try {
    const user = await userService.login("jova@email.com", "sifra123");

    res.json({
      test: user,
    });
  } catch (e) {
    console.log(e);
  }
});

app.get("/register", async (req, res) => {
  try {
    const user = await UserService.register(
      "jova",
      "jova@email.com",
      "sifra123",
    );

    res.json({
      test: user,
    });
  } catch (e) {
    if (e.code === prismaStatusCodes.UNIQUE_CONSTRAINT_FAILED)
      throw new Error("Email already exists");
    console.error(e);
  }
});

app.listen(3000);
