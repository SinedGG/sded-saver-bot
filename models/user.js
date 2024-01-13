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
  async changeLang(tg_id, lang) {
    return await prisma.users.update({
      where: {
        tg_id: tg_id,
      },
      data: {
        language_code: lang,
      },
    });
  },
  async getLang(tg_id) {
    return await prisma.users.findUnique({
      where: {
        tg_id: tg_id,
      },
      select: {
        language_code: true,
      },
    });
  },
};
