module.exports = async (bot, msg, opts) => {
    let chatId = msg.chat.id;
    let helpMsg = ("Hello! Here are the bots commands. \n\n \`\`\`COMMANDS \n/help, Help Command. \n\n/start, Start Command.\n\n/urban, Urban Dictionary Command, Use it like this: /urban (search). without the ().\n\n/Ping, Ping Command to Test\`\`\`").replace(/(\[[^\][]*]\(http[^()]*\))|[[\]()~>#+=|{}.!-]/g, (x, y) => y ? y : '\\' + x);
    bot.sendMessage(chatId, helpMsg, opts)
}