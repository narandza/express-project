const UserService = require("../services/userService");
const prismaStatusCodes = require("../../config/prismaStatusCodes");

module.exports = {
  register: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserService.register(name, email, password);
      res.json();
    } catch (e) {
      if (e.code === prismaStatusCodes.UNIQUE_CONSTRAINT_FAILED)
        throw new Error("Email already exists");
      console.error(e);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.login(email, password);

      res.json({
        test: user,
      });
    } catch (e) {
      console.log(e);
    }
  },
};
