const { MessageEmbed } = require("discord.js")
const moment = require("moment");

module.exports.run = async (client, message) => {
    moment.locale(message.guild.lang);

    const servInfos = new MessageEmbed()
    .setTitle(`Informations`)
    .setColor(client.colors.blue)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .addField(message.guild.lang==="fr"?"Propiétaire":"Owner", message.guild.owner.user.tag)
    .addField(message.guild.lang==="fr"?"ID du Propriétaire":"Owner ID", message.guild.owner.user.id)
    .addField(message.guild.lang==="fr"?"Nom":"Name", message.guild.name)
    .addField("ID", message.guild.id)
    .addField(message.guild.lang==="fr"?"Niveau / boosts":"Level / boosts", `${message.guild.premiumSubscriptionCount} Boost | Niveau ${message.guild.premiumTier}`)
    .addField(message.guild.lang==="fr"?"Niveau de vérification":"Verification Level", message.guild.verificationLevel)
    .addField("Region", message.guild.region)
    .addField(message.guild.lang==="fr"?"Date de création du serveur":"Server creation date", moment(message.guild.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss"))
    .addField(`Memb${message.guild.lang==="fr"?"re":"er"}s`, `Huma${message.guild.lang==="fr"?"i":""}ns : ${message.guild.members.cache.filter(x => !x.user.bot).size}\nBots : ${message.guild.members.cache.filter(x => x.user.bot).size}`)
    .addField("Roles", message.guild.roles.cache.size)
    .addField("Emojis", message.guild.emojis.cache.size)
    .addField("Channels", `${message.guild.lang==="fr"?"Catégories":"Categories"} : ${message.guild.channels.cache.filter(x => x.type === "category").size}\nText${message.guild.lang==="fr"?"e":""}s : ${message.guild.channels.cache.filter(x => x.type === "text").size}\nVo${message.guild.lang==="fr"?"cal":"ice"} : ${message.guild.channels.cache.filter(x => x.type === "voice").size}`)
    
    message.channel.send({ embed: servInfos });
}

module.exports.help = {
    description: "Sert à voir les infos du serveur ou  à été executée la commande.",
    name: "serverinfo",
    aliases: ["si", "infosserver"],
    category: "utils"
}