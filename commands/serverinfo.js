const { MessageEmbed } = require("discord.js")
const moment = require("moment");

moment.locale("fr");

module.exports.run = async (client, message) => {
    const servInfos = new MessageEmbed()
    .setTitle(`Informations du serveur`)
    .setColor(client.colors.blue)
    .setThumbnail(message.guild.iconURL({format: "png"}))
    .addField("Propiétaire", message.guild.owner.user.tag)
    .addField("ID du Propriétaire", message.guild.owner.user.id)
    .addField("Nom du serveur", message.guild.name)
    .addField("ID du serveur", message.guild.id)
    .addField("Niveau de vérification", message.guild.verificationLevel)
    .addField("Région du serveur", message.guild.region)
    .addField("Date de création du serveur", moment(message.guild.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss"))
    .addField("Membres", `Humains : ${message.guild.members.cache.filter(x => !x.user.bot).size}\nBots : ${message.guild.members.cache.filter(x => x.user.bot).size}`)
    .addField("Roles", message.guild.roles.cache.size)
    .addField("Emojis", message.guild.emojis.cache.size)
    .addField("Channels", `Catégories : ${message.guild.channels.cache.filter(x => x.type === "category").size}\nTextes : ${message.guild.channels.cache.filter(x => x.type === "text").size}\nVocal : ${message.guild.channels.cache.filter(x => x.type === "voice").size}`)
    
    message.channel.send(servInfos);
}

module.exports.help = {
    description: "Sert à voir les infos du serveur ou  à été executée la commande.",
    name: "serverinfo",
    aliases: ["si", "infosserver"],
    category: "utils"
}