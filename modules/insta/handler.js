const downloader = require("./downloader");
const sendMessage = require("../sendMessage");
const formatTime = require("../../utils/formatTime");
module.exports = async (url, chatId) => {
  try {
    const startTime = performance.now();

    const sourceUrl = await downloader(url);
    await bot.telegram.sendVideo(chatId, sourceUrl, {
      caption: `[link](${url}) | [via](https://t.me/SDEDsaver_bot)`,
      parse_mode: "Markdown",
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${formatTime(executionTime)} for ${url}`);
  } catch (error) {
    console.log(error);
    sendMessage(chatId, "downloadError");
  }
};
