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

// Creating bot client
const bot = new Discord.Client();

// Start by adding an event listener "ready"
// Log in console when bot is connected
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}`);
});

// Login as Discord bot client
bot.login(config.token);