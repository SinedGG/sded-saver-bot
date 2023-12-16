const downloader = require("./downloader");
module.exports = (url, chatId) => {
  return new Promise(async (resolve, reject) => {
    const sourceUrl = await downloader(url);
    bot.telegram.sendVideo(chatId, sourceUrl, {
      caption: `[link](${url}) | [via](https://t.me/SDEDsaver_bot)`,
      parse_mode: "Markdown",
    });
  });
};
