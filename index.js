require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TG_TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome");
});

bot.launch();
