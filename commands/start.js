module.exports = {
  name: "start",
  async execute(ctx) {
    const { Markup } = require("telegraf");
    const create = require("../models/user").create;

    try {
      await create(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name
      );
      console.log(`User ${ctx.from.id} added to database.`);
    } catch (err) {
      if (err.code == "P2002") {
        console.log(`User ${ctx.from.id} already exists in database.`);
      } else {
        console.log(err);
      }
    }
    ctx.reply(
      "Hi! Select a language to start:",
      Markup.inlineKeyboard([
        Markup.button.callback("🇺🇦", `cl ukr`),
        Markup.button.callback("🇺🇸/🇬🇧", `cl eng`),
      ])
    );
  },
};
