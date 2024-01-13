module.exports = {
  name: "cancelLoad",
  async execute(ctx) {
    const playlist = require("../modules/yt-music/playList");
    playlist.tasks.delete(ctx.chat.id);
    ctx.reply("👌");
  },
};
