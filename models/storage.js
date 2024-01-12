const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async get(yt_id) {
    return await prisma.Storage.findUnique({
      where: {
        yt_id: yt_id,
      },
      select: {
        message_id: true,
      },
    });
  },
  async set(yt_id, message_id) {
    return await prisma.storage.create({
      data: {
        yt_id: yt_id,
        message_id: message_id,
      },
    });
  },
};
