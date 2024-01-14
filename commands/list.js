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
    const info = await playlist.info(list_id);
    bot.telegram.sendMessage(
      chatId,
      `Playlist: ${info.snippet.title} size: ${info.contentDetails.itemCount}`
    );

    playlist.tasks.create(chatId);
    sendMessage(chatId, "playlistStart");
    let links,
      page_token = "";
    do {
      ({ links, page_token } = await playlist.load(list_id, page_token));
      for (let i = 0; i < links.length; i++) {
        if (!playlist.tasks.get(chatId)) break;
        await download(`https://www.youtube.com/watch?v=${links[i]}`, chatId);
      }
    } while (page_token && !oneTime);
  } catch (error) {
    console.log(error);
    sendMessage(chatId, "playlistError");
  }
}
