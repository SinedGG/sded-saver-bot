module.exports = {
  name: "callback_query",
  async execute(ctx) {
    const sendMessage = require("../modules/sendMessage");
    const { changeLang } = require("../models/user");

    const data = ctx.callbackQuery.data;
    const action = data.split(" ")[0];
    if (action != "cl") return;
    const lang = data.split(" ")[1];
    await changeLang(ctx.from.id, lang);

    ctx.answerCbQuery();
    bot.telegram.deleteMessage(
      ctx.from.id,
      ctx.callbackQuery.message.message_id
    );
    sendMessage(ctx.from.id, "welcome");
  },
};
