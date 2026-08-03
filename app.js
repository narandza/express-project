const express = require("express");
const prisma = require("./prismaClient");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const user = prisma.user.create({
    data: {
      email: "test2@gmail.com",
      name: "Bron",
      password: "sifra123",
    },
  });

  res.json({
    test: "Check db",
  });
});

app.listen(3000);
