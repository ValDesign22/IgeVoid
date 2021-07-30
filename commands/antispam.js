const { MessageEmbed } = require("discord.js");
const guild = require("../models/guild");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.error(message.lang.noPerm.replace(/{perm}/g, "MANAGE_CHANNELS"), message, client);

    let possibilities = ["messages", "statut", "time", "info"];

    if (!args[0] || !possibilities.includes(args[0])) {
        message.error(message.lang.antispam.values.replace(/{values}/g, possibilities.map(x => `\`${x}\``)), message, client);
    }
    else if (args[0] === "messages") {
        if (!args[1]) return message.error(message.lang.antispam.msgs, message, client);

        const spamGet = await guild.findOne({ id: message.guild.id, reason: "antispam" });

        const msgCount = spamGet ? spamGet.content : Number(5).toString();

        if (isNaN(args[1])) return message.error(message.lang.notNmb.replace(/{nmb}/g, args[1]), message, client);

        if (args[1] === msgCount) return message.error(message.lang.antispam.sameMsg, message, client);

        const updateMsg = await guild.findOneAndUpdate({ id: message.guild.id, reason: "antispam" }, { $set: { content: args[1], reason: "antispam" } }, { new: true });
    
        message.reply(message.lang.antispam.newMsg.replace(/{msg}/g, args[1]));
    }
    else if (args[0] === "time") {
        if (!args[1]) return message.error(message.lang.antispam.time, message, client);

        const getTime = await guild.findOne({ id: message.guild.id, reason: "antispam" });

        const Time = getTime ? getTime.temps : 3000;

        const time = ms(args[1]);

        if (Time === time) return message.error(message.lang.antispam.same.replace(/{same}/g, args[1]), message, client);

        if (time < (1000 || ms("1ms"))) return message.error(message.lang.antispam.underOne, message, client);

        const updateTime = await guild.findOneAndUpdate({ id: message.guild.id, reason: "antispam" }, { $set: { temps: time, reason: "antispam" } }, { new: true });

        message.reply(message.lang.antispam.newNbr.replace(/{nbr}/g, args[1]));
    }
    else if (args[0] === "statut") {
        possibilities = ["true", "false"];

        if (!args[1] || !possibilities.includes(args[1])) {
            return message.error(message.lang.antispam.values.replace(/{values}/g, possibilities.map(x => `\`${x}\``)), message, client);
        }

        const spamGet = await guild.findOne({ id: message.guild.id, reason: "antispam" });

        const spam = spamGet ? spamGet.stat : false;

        if (args[1] === spam.toString()) return message.error(message.lang.antispam.alreadySet.replace(/{stat}/g, args[1]), message, client);

        const updateSpam = await guild.findOneAndUpdate({ id: message.guild.id, reason: "antispam" }, { $set: { stat: args[1], reason: "antispam" } }, { new: true });

        message.reply(message.lang.antispam.new.replace(/{stat}/g, args[1]));
    }
    else if (args[0] === "info") {
        const spamGet = await guild.findOne({ id: message.guild.id, reason: "antispam" });

        const stat = spamGet ? spamGet.stat : false;
        const time = spamGet ? spamGet.temps : 3000;
        const msgCount = spamGet ? spamGet.content : Number(5).toString();

        const infoEmbed = new MessageEmbed()
        .setColor(client.colors.blue)
        .setTitle(`Antispam ${message.guild.name}.`)
        .addField(message.guild.lang === "fr" ? "Temps" : "Time", `${time/1000} ${message.guild.lang === "fr" ? "secondes" : "seconds"}`)
        .addField("Messages: ", msgCount)
        .addField("Statut: ", `${stat}`)

        message.channel.send({ embed: infoEmbed });
    }
}

module.exports.help = {
    description: "Permet de regler l'antispam du serveur.",
    name: "antispam",
    aliases: ["aspam", "antisp", "spam"],
    category: "config"
}