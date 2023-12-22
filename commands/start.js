module.exports = {
  name: "start",
  async execute(ctx) {
    const create = require("../models/user").create;

    try {
      await create(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name
      );
      console.log(`User ${ctx.from.id} added to database.`);
      ctx.reply(
        "Welcome! This bot can download videos from Instagram and TikTok. Just send me a link to the post."
      );
    } catch (err) {
      if (err.code == "P2002") {
        ctx.reply(
          "Welcome! This bot can download videos from Instagram and TikTok. Just send me a link to the post."
        );
        console.log(`User ${ctx.from.id} already exists in database.`);
      } else console.log(err);
    }
  },
};
