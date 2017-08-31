var Discord = require('discord.io');
var auth = require('./config/auth.json');
var alex = require('alex');

// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    console.info('Connected');
    console.info('Logged in as: ');
    console.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    var messages = alex(message).messages;

    messages.forEach(function (message) {
        message = message.message;
        bot.sendMessage({
            to: channelID,
            message: message
        });
    }, this);


});