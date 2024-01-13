const sendMessage = require("../modules/sendMessage");

module.exports = {
  name: "help",
  async execute(ctx) {
    sendMessage(ctx.chat.id, "welcome");
  },
};
