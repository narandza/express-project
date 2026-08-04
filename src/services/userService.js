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

  login: async (email, password) => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user === null) throw new Error("User with this email does not exist");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error("Wrong password");

    return user;
  },
};
