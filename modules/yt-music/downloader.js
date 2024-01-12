const ffmpeg = require("fluent-ffmpeg");
const axios = require("axios");
const fs = require("fs");

module.exports = (stream, meta) => {
  return new Promise(async (resolve, reject) => {
    const fileName = format(meta.title + " - " + meta.artist) + ".mp3";
    const path = `temp/${fileName}`;
    const artPath = await getArt(meta.art, meta.videoId);

    ffmpeg(stream)
      .input(artPath)
      .format("mp3")
      .audioBitrate(320)
      .outputOptions("-map", "0")
      .outputOptions("-map", "1")
      .outputOptions("-id3v2_version", "3")
      .outputOptions("-metadata", "title=" + meta.title)
      .outputOptions("-metadata", "artist=" + meta.artist)

      .on("end", () => {
        resolve({ song: path, art: artPath });
      })
      .on("error", (err) => {
        reject(err);
        console.log(err);
      })
      .output(path)
      .run();
  });
};

function format(name) {
  return name.replace(/[/\\?%*:|"<>]/g, " ");
}

function getArt(url, videoId) {
  const path = `temp/${videoId}.jpg`;
  {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url, { responseType: "stream" });
        const writer = fs.createWriteStream(path);
        res.data.pipe(writer);
        writer.on("finish", () => {
          resolve(path);
        });
      } catch (error) {
        console.log(` Art download error`);
        reject(error);
      }
    });
  }
}
