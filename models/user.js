const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(tg_id, tg_username, tg_first_name, tg_last_name) {
    return await prisma.users.create({
      data: {
        tg_id: tg_id,
        tg_username: tg_username,
        tg_first_name: tg_first_name,
        tg_last_name: tg_last_name,
      },
    });
  },
};
