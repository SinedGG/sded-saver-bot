const axios = require("axios");

const storage = require("./storage");
const sendMessage = require("../sendMessage");
const formatTime = require("../../utils/formatTime");

module.exports = async (url, chatId) => {
  try {
    const startTime = performance.now();
    const data = await axios.get(
      `https://api.song.link/v1-alpha.1/links?url=${url}`
    );
    const songData = data.data;
    if (songData.linksByPlatform.hasOwnProperty("youtubeMusic")) {
      const uniqueId = songData.linksByPlatform.youtubeMusic.entityUniqueId;
      const song_id = songData.entitiesByUniqueId[uniqueId].id;

      const message_id = await storage(song_id, songData.pageUrl);

      bot.telegram.forwardMessage(chatId, process.env.DATA_CHAT_ID, message_id);
    }

    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.log(`Execution time: ${formatTime(executionTime)} for ${url}`);
  } catch (error) {
    console.log(error);
    sendMessage(chatId, "notFoundSongLink");
  }
};
