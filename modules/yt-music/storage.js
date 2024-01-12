const ytdl = require("ytdl-core");
const YTMusic = require("ytmusic-api").default;
const downloader = require("./downloader");
const fs = require("fs");

const db = require("../../models/storage");

module.exports = (videoId, song_link) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await db.get(videoId);
      if (result && result.message_id) return resolve(result.message_id);

      const ytmusic = new YTMusic();
      await ytmusic.initialize();
      const info = await ytmusic.getSong(videoId);
      const meta = {
        title: info.name,
        artist: info.artist.name,
        art: info.thumbnails[info.thumbnails.length - 1].url,
        videoId: info.videoId,
      };

      const stream = ytdl(videoId, {
        quality: "highestaudio",
        filter: "audioonly",
        bitrate: 320,
      });

      const patch = await downloader(stream, meta);

      const msg = await bot.telegram.sendAudio(
        process.env.DATA_CHAT_ID,
        { source: patch.song },
        {
          caption: `[song.link](${song_link}) | [via](https://t.me/SDEDsaver_bot)`,
          parse_mode: "Markdown",
          title: meta.title,
          performer: meta.artist,
          thumb: { source: patch.art },
        }
      );
      await db.set(videoId, msg.message_id);

      deleteFile(patch.song);
      deleteFile(patch.art);

      resolve(msg.message_id);
    } catch (error) {
      reject(error);
    }
  });
};

function deleteFile(path) {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.error(err);
  }
}
