const axios = require("axios");

const storage = require("./storage");

module.exports = (url, chatId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data: songData } = await axios.get(
        `https://api.song.link/v1-alpha.1/links?url=${url}`
      );

      if (songData.linksByPlatform.hasOwnProperty("youtubeMusic")) {
        const uniqueId = songData.linksByPlatform.youtubeMusic.entityUniqueId;
        const song_id = songData.entitiesByUniqueId[uniqueId].id;

        const message_id = await storage(song_id, songData.pageUrl);

        bot.telegram.forwardMessage(
          chatId,
          process.env.DATA_CHAT_ID,
          message_id
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
};
