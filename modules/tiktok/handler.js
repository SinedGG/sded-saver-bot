const downloader = require("./downloader");
const sendMessage = require("../sendMessage");
const formatTime = require("../../utils/formatTime");
module.exports = async (url, chatId) => {
  try {
    const startTime = performance.now();

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

      await bot.telegram.sendMediaGroup(chatId, mediaGroup);
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${formatTime(executionTime)} for ${url}`);
  } catch (error) {
    console.log(error);
    sendMessage(chatId, "downloadError");
  }
};
