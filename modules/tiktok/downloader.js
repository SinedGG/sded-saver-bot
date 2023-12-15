const axios = require("axios");

const api = `https://api16-normal-v4.tiktokv.com`;

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
};

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    var videoId = validateUrl(url);
    if (!videoId) url = await getFullUrl(url);
    videoId = validateUrl(url);
    if (!videoId) reject("Invalid url");
    const sourceUrl = await getSourceUrl(videoId, url);
    resolve(sourceUrl);
  });
};

function getFullUrl(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers })
      .then((res) => {
        resolve(res.request.res.responseUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function validateUrl(url) {
  const match = url.match(/\/video\/(\d+)/);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}

function getSourceUrl(videoId, url) {
  return new Promise(async (resolve, reject) => {
    const { data } = await axios.get(
      `${api}/aweme/v1/feed/?aweme_id=${videoId}`
    );
    const images = data.aweme_list[0]?.image_post_info?.images;
    if (images) {
      const tmp = {
        type: "image",
        url: [],
        sourceUrl: url,
      };
      images.forEach((e) => {
        tmp.url.push(e.display_image.url_list[1]);
      });
      resolve(tmp);
    } else {
      resolve({
        type: "video",
        url: data.aweme_list[0]?.video?.play_addr?.url_list[0],
        sourceUrl: url,
      });
    }
  });
}
