import alex = require("alex");
import Discord = require("discord.io");
import winston = require("winston");
import { botAuth } from "./config/botAuth/botAuth";

const bot = new Discord.Client({
    autorun: true,
    token: botAuth.token,
});
bot.on("ready", (evt) => {
    winston.info("Connected 2");
    winston.info("Logged in as: ");
    winston.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", function (user, userID, channelID, message, evt) {
    bot.sendMessage({
        message: "asd",
        to: channelID,
    });
    winston.debug("message.get");
    const complaints = alex(message, null).messages;
    winston.debug(complaints);
    complaints.forEach((complaint) => {
        const complaintMessage = complaints.message;
        bot.sendMessage({
            message: complaintMessage,
            to: channelID,
        });
    }, this);
});
