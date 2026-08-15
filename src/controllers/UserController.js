const prisma = require("../../prismaClient");

module.exports = {
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
