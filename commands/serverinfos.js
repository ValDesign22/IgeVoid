const Discord = require("discord.js");
const moment = require("moment");

moment.locale("fr");

exports.run = (client, message, args) => {
    const e = new Discord.MessageEmbed()
        .setTitle("Informations du Serveur")
        .setThumbnail(message.guild.iconURL())
        .setColor("#37BFF9")
        .addFields(
            { name: "Propriétaire", value: message.guild.owner.user.tag },
            { name: "ID du Propriétaire", value: message.guild.owner.id },
            { name: "Nom du serveur", value: message.guild.name },
            { name: "ID du serveur", value: message.guild.id },
            { name: "Niveau de vérification", value: message.guild.verificationLevel },
            { name: "Région du serveur", value: message.guild.region },
            { name: "Date de création du serveur", value: moment(message.guild.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss") },
            { name: "Membres", value: message.guild.members.cache.filter(mbr => !mbr.user.bot).size },
            { name: "Bots", value: message.guild.members.cache.filter(mbr => mbr.user.bot).size },
            { name: "Text Channels", value: message.guild.channels.cache.filter(c => c.type === "text").size },
            { name: "Voice Channels", value: message.guild.channels.cache.filter(c => c.type === "voice").size },
            { name: "Categories", value: message.guild.channels.cache.filter(c => c.type === "category").size },
            { name: "Roles", value: message.guild.roles.cache.size },
            { name: "Emojis", value: message.guild.emojis.cache.size }
        )

        message.channel.send(e)
}