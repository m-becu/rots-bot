/**
 * @author Anorak
 * @copyright lewebicien.fr 2021
 * @license GNUv3
 * @version 0.0.1
 * 
 * the 9th of march, 2021
 * 
 * This is the bot.js file, which handles the core code of the bot-app for the ROTS project
 * rots-bot v0.0.1 - Node.js application
 */

/**
 * Import config.json as bot configuration file.
 * This file contains two values : 
 * - token: which is the Discord app bot token
 * - prefix: is the caracter used as a prefix for bot commands
 */
const config = require('./config.json');

// Import libraries
const Discord = require('discord.js');
const MySQL = require('mysql');
// Import system libraries
const fs = require('fs');

// Creating bot client
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Importing commands
fs.readdir(__dirname + '/cmds/', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loaded ${jsfiles.length} commmands.`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Start by adding an event listener "ready"
bot.on('ready', async() => {
    console.log(`Logged in as ${bot.user.username}`);
});

// Log in console when bot is connected
// Create connection to database
/*
var con = MySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "rots"
});

con.connect(err => {
    if (err) throw err;
    console.log("Connected to database!");
});
*/

// Adding a "message" event listener
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(config.prefix)) return;

    let cmd = bot.commands.get(command.slice(config.prefix.length));
    if (cmd) cmd.run(bot, message, args, /* con */);
 
});

// Login as Discord bot client
bot.login(config.token);