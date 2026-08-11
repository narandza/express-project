const UserService = require("../services/userService");
const prismaStatusCodes = require("../../config/prismaStatusCodes");

module.exports = {
  register: async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body must be valid JSON with Content-Type: application/json",
      });
    }

    const { name, email, password } = req.body;

    try {
      const user = await UserService.register(name, email, password);

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (e) {
      if (e.code === prismaStatusCodes.UNIQUE_CONSTRAINT_FAILED) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }

      console.error(e);

      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  },

  login: async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message: "Request body must be valid JSON with Content-Type: application/json",
      });
    }

    const { email, password } = req.body;

    try {
      const user = await UserService.login(email, password);

      return res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (e) {
      console.error(e);

      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  },
};
