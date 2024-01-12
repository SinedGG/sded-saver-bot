require("dotenv").config();
const { Telegraf } = require("telegraf");
global.bot = new Telegraf(process.env.TG_TOKEN);

require("./handler/command.js")(bot);

const tiktok = require("./modules/tiktok/handler");
const insta = require("./modules/insta/handler");
const yt = require("./modules/yt-music/handler");

bot.on("text", (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.message.chat.id;
  if (text.includes("tiktok.com")) tiktok(text, chatId);
  else if (text.includes("instagram.com/reel")) insta(text, chatId);
  else yt(text, chatId);
});

bot.launch();
