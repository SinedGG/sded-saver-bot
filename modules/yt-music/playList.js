const axios = require("axios");

let tasks = [];

module.exports = {
  tasks: {
    create: (chatId) => {
      tasks.push(chatId);
    },
    delete: (chatId) => {
      tasks = tasks.filter((id) => id != chatId);
    },
    get: (chatId) => {
      return tasks.includes(chatId);
    },
  },

  load: (list_id, page_token) => {
    return new Promise(async (resolve, reject) => {
      const api_key = process.env.YT_TOKEN;
      let out = [];
      if (!page_token) page_token = "";

      try {
        const request = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list_id}&pageToken=${page_token}&key=${api_key}&maxResults=2000`;
        const res = await axios.get(request);
        for (let j = 0; j < res.data.items.length; j++) {
          let id = res.data.items[j].snippet.resourceId.videoId;
          out.push(id);
        }

        resolve({ links: out, page_token: res.data.nextPageToken });
      } catch (err) {
        reject("[list] " + err);
      }
    });
  },
};
