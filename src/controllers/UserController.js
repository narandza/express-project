const prisma = require("../../prismaClient");

module.exports = {
  register: async (req, res) => {
    if (!req.body) {
      return res.status(400).json({
        message:
          "Request body must be valid JSON with Content-Type: application/json",
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
  getAll: async (req, res) => {
    res.json({
      users: await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
        },
      }),
    });
  },
};
