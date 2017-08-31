import alex = require("alex");
import Discord = require("discord.io");
import winston = require("winston");
import { botAuth } from "./config/botAuth/botAuth";

const bot = new Discord.Client({
    autorun: true,
    token: botAuth.token,
});
bot.on("ready", (evt) => {
    winston.info("Connected");
    winston.info("Logged in as: ");
    winston.info(bot.username + " - (" + bot.id + ")");
});
bot.on("message", function (user, userID, channelID, message, evt) {
    if (userID !== bot.id) {
        const complaints = alex(message, null).messages;
        complaints.forEach((complaint) => {
            const complaintMessage = complaint.message;
            bot.sendMessage({
                message: complaintMessage,
                to: channelID,
            });
        }, this);
    }
});
