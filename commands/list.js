const playlist = require("../modules/yt-music/playList");
const download = require("../modules/yt-music/handler");
const sendMessage = require("../modules/sendMessage");
module.exports = {
  name: "list",
  async execute(ctx) {
    try {
      const url = ctx.message.text.split(" ")[1];
      const list_id = new URL(url).searchParams.get("list");
      downloadList(list_id, ctx.chat.id);
    } catch (error) {
      console.log(error);
      sendMessage(ctx.chat.id, "noListURL");
    }
  },
};

async function downloadList(list_id, chatId) {
  let oneTime = false;
  if (list_id.startsWith("RD")) {
    sendMessage(chatId, "playlistRandom");
    oneTime = true;
  }

  try {
    let { links, page_token } = await playlist.load(list_id);
    playlist.tasks.create(chatId);
    sendMessage(chatId, "playlistStart");
    for (let i = 0; i < links.length; i++) {
      if (!playlist.tasks.get(chatId)) break;
      if (i == links.length - 2 && !oneTime) {
        let out = await playlist.load(list_id, page_token);
        links = links.concat(out.links);
        page_token = out.page_token;
      }
      await download(`https://www.youtube.com/watch?v=${links[i]}`, chatId);
    }
  } catch (error) {
    console.log(error);
    sendMessage(chatId, "playlistError");
  }
}
