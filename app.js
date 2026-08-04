const express = require("express");
const UserService = require("./src/services/userService");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const user = await UserService.register("jova", "jova@email.com", "sifra123");
  res.json({
    test: user,
  });
});

app.listen(3000);
