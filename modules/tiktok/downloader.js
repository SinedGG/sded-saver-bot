const axios = require("axios");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post(
        `https://snaptiktok.me/wp-json/aio-dl/video-data`,
        {
          url,
        }
      );
      if (data.error) reject(data.error);

      const jpgUrls = data.medias
        .filter((media) => media.extension === "jpg")
        .map((media) => media.url);

      if (jpgUrls.length != 0) {
        resolve({
          type: "image",
          url: jpgUrls,
          sourceUrl: url,
        });
      } else {
        let largestFile = null;
        let largestFileSize = 0;

        data.medias.forEach((media) => {
          if (media.size > largestFileSize) {
            largestFileSize = media.size;
            largestFile = media;
          }
        });
        resolve({
          type: "video",
          url: largestFile.url,
          sourceUrl: url,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
