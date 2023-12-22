const downloader = require("./downloader");
module.exports = (url, chatId) => {
  return new Promise(async (resolve, reject) => {
    const data = await downloader(url);
    if (data.type == "video") {
      bot.telegram.sendVideo(chatId, data.url, {
        caption: `[link](${url}) | [via](https://t.me/SDEDsaver_bot)`,
        parse_mode: "Markdown",
      });
    }
    if (data.type == "image") {
      var mediaGroup = [];
      data.url.forEach((e) => {
        mediaGroup.push({
          type: "photo",
          media: e,
        });
      });

      mediaGroup[0].caption = `[link](${url}) | [via](https://t.me/SDEDsaver_bot)`;
      mediaGroup[0].parse_mode = "Markdown";

      bot.telegram.sendMediaGroup(chatId, mediaGroup);
    }
  });
};
