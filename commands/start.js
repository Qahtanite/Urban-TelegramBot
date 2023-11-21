module.exports = async (bot, msg, opts) => {
    let chatId = msg.chat.id;
    let startMessage = "Hello\\\! To start using this bot use \\\/help\\\."
    await bot.sendMessage(chatId, startMessage, opts)
}