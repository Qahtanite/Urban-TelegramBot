const token = 'INSERT-TOKEN-HERE';
const TelegramBot = require('node-telegram-bot-api');
let bot = new TelegramBot(token, { polling: true });
const path = require('path')
const fs = require('fs');
const urbanfile = require('./commands/urban');
const ping = require('./commands/ping');
const start = require('./commands/start')
const help = require('./commands/help')
const getData = require('./GetData')


const opts = {
  parse_mode: 'MarkdownV2'
}

   // THIS WILL BE FOR ERRORS.
const {errors} = require('./errors.json')
let urbanerr = errors.urban
let urbanArgErr = errors.urbanArg


const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

   // THIS IS FOR PATHING YOUR COMMAND FILES.
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
}
   // START MESSAGE.
    bot.onText(/\/start/, async (msg, match) => {
    start(bot, msg, opts)
    })

    bot.onText(/\/help/, async (msg, match) => {
      
      
    help(bot, msg, opts)
      })

    // URBAN COMMAND THAT WILL BE TRIGGERED ONCE THERE IS A SECOND OR MORE ARGUEMENTS.
    bot.onText(/\/urban (.+)/, async (msg, match) => {
    urbanfile(bot, msg, match, opts, urbanerr, urbanArgErr)
    })

    // THIS WILL TRIGGER WHEN ONLY "/URBAN" IS SENT WITH NO FURTHER ARGUEMENTS.
    bot.onText(/\/urban$/, async (msg, match) => {
    let chatId = msg.chat.id;
    bot.sendMessage(chatId, urbanArgErr, opts)
    
    
    })

    // THIS WILL TRIGGER WHEN "/PING" IS SENT IN CHAT.
    bot.onText(/\/ping/, async (msg, match) => {
      ping(bot, msg, match, opts)
      
      })


      // THIS WILL BE FOR ANY MESSAGE THAT YOU WILL GET.
      // IF YOU WISH TO REMOVE THIS TO SAVE A BIT OF SPACE DO IT AND DELETE GETDATA.JS.
      bot.onText(/.*/, async(msg, match) => {
        getData(msg, match)
      })
      