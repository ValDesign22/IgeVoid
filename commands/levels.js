const leveling = require("discord-leveling");
const Discord =require("discord.js");

exports.run = async (client, message, args, dbPrefixs, dbTickets, prefix, dbWelcome, dbGoodbye, dbRank) => {
    if (dbRank.get(`lvl_${message.guild.id}`) === "on") {
    	message.channel.send("En développement.")
    }
    else if (dbRank.get(`lvl_${message.guild.id}`) === "off") {
        message.channel.send("Le système de niveau sur le serveur est désactivé.")
    }
}