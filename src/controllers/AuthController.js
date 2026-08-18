const UserService = require("../services/userService");
const prismaStatusCodes = require("../../config/prismaStatusCodes");
const bcrypt = require("bcryptjs");
const { generateLoginToken } = require("../utils/jwt");

module.exports = {
  login: async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message:
          "Request body must be valid JSON with Content-Type: application/json",
      });
    }

    const { email, password } = req.body;

    try {
      const user = await UserService.login(email, password);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }

      const { password: _password, ...safeUser } = user;

      return res.status(200).json({
        message: "Login successful",
        user: safeUser,
        token: generateLoginToken({ userId: user.id }),
      });
    } catch (e) {
      console.error(e);

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  },
};
