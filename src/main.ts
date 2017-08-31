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
bot.on("message", (user, userID, channelID, message, evt) => {
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
bot.on("disconnect", (errMsg, code) => {
    winston.info("Disconnected");
    if (errMsg) { winston.info("errMsg:" + errMsg); }
    if (code) { winston.info("code:" + code); }
});
