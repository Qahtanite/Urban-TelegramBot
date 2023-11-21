module.exports = async (bot, msg, match, opts, urbanerr, urbanArgErr) => {
    
    const urban = require('urban')
    let chatId = msg.chat.id;
    // MESSAGE ARGUEMENTS.
    let args = match[1]
    // URBAN SEARCH FOR ARGUEMENT.
    let ubn = await urban(args)
    
    ubn.first(async function(json) {
    // IF URBAN SEARCH APPEARS TO BE UNDEFINED.
    if(json === undefined) return bot.sendMessage(chatId, urbanerr, opts)
    // MESSAGE.
     let message = (`_Definition of_\`\`\` ${json.word}\`\`\` _by_\`\`\` ${json.author}\`\`\`\n\n\n*Definition*\n\`\`\`\n${json.definition}\`\`\`\n\n\n*Example*\n\`\`\`\n${json.example}\`\`\`\n\n[Urban Link](${json.permalink})\\\n👍${json.thumbs_up}, 👎${json.thumbs_down}`).replace((/(\[[^\][]*]\(http[^()]*\))|[[\]()~>#+=|{}.!-]/gi, (x,y) => y ? y : '\\' + x) )
     
    // REQUEST TO SEND MESSAGE.
     await bot.sendMessage(chatId, message, opts).catch(err => {
        bot.sendMessage(chatId, urbanerr, opts)
     })
     
   
        
    })}
