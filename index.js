require("dotenv").config();
const { Telegraf } = require("telegraf");
global.bot = new Telegraf(process.env.TG_TOKEN);

const tiktok = require("./modules/tiktok/handler");

bot.on("text", (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.message.chat.id;
  if (text.includes("tiktok.com")) tiktok(text, chatId);
});

bot.launch();
