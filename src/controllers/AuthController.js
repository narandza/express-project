const UserService = require("./src/services/userService");
const prismaStatusCodes = require("./config/prismaStatusCodes");

module.exports = {
  register: async (req, res) => {
    try {
      const user = await UserService.register();
      res.json();
    } catch (e) {
      if (e.code === prismaStatusCodes.UNIQUE_CONSTRAINT_FAILED)
        throw new Error("Email already exists");
      console.error(e);
    }
  },
  login: async (req, res) => {
    try {
      const user = await UserService.login("jova@email.com", "sifra123");

      res.json({
        test: user,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
