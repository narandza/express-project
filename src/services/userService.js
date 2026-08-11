const prisma = require("../../prismaClient");
const bcrypt = require("bcryptjs");

module.exports = {
  register: async (name, email, password) => {
    const hashed = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
  },

  login: async (email) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },
};
