module.exports = async (chatId, arg) => {
  let code = await require("../models/user").getLang(chatId);
  if (code) code = code.language_code;
  else code = "eng";
  const lang = require(`../languages/${code}.js`);
  bot.telegram.sendMessage(chatId, lang[arg]);
};
