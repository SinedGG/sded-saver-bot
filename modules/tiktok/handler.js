const downloader = require("./downloader");
module.exports = (url, chatId) => {
  return new Promise(async (resolve, reject) => {
    const data = await downloader(url);
    console.log(data);
    if (data.type == "video") {
      bot.telegram.sendVideo(chatId, data.url, {
        caption: `Посилання - [клац](${data.sourceUrl})`,
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

      mediaGroup[0].caption = `Посилання - [клац](${data.sourceUrl})`;
      mediaGroup[0].parse_mode = "Markdown";

      bot.telegram.sendMediaGroup(chatId, mediaGroup);
    }
  });
};
