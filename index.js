require("dotenv").config();
const { Telegraf } = require("telegraf");
global.bot = new Telegraf(process.env.TG_TOKEN);

require("./handler/command.js")(bot);
require("./handler/event.js")(bot);

const tiktok = require("./modules/tiktok/handler");
const insta = require("./modules/insta/handler");
const yt = require("./modules/yt-music/handler");
const sendMessage = require("./modules/sendMessage.js");

bot.on("text", (ctx) => {
  const text = ctx.message.text;
  const chatId = ctx.message.chat.id;
  console.log(`Request from ${ctx.from.username} (${chatId}) - ${text} `);
  if (text.includes("tiktok.com")) {
    tiktok(text, chatId);
  } else if (text.includes("instagram.com/reel")) {
    insta(text, chatId);
  } else if (text.includes("youtube.com/playlist?list=PL")) {
    sendMessage(chatId, "playlistDetected");
  } else {
    yt(text, chatId);
  }
});

bot.launch();
