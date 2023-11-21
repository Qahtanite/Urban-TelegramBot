module.exports = async (bot, msg, match, opts) => {
    let chatId = msg.chat.id;
    
    // PING COMMAND
     let message = ("Pong\\! 🏓")
     await bot.sendMessage(chatId, message, opts)
    
}