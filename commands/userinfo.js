const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message) => {
    const badges = {
        DISCORD_EMPLOYEE: client.emotes.De,
        PARTNERED_SERVER_OWNER: client.emotes.Pso,
        DISCORD_PARTNER: client.emotes.Dp,
        HYPESQUAD_EVENTS: client.emotes.He,
        BUGHUNTER_LEVEL_1: client.emotes.BLvl1,
        BUGHUNTER_LEVEL_2: client.emotes.BLvl2,
        HOUSE_BRAVERY: client.emotes.HBra,
        HOUSE_BRILLIANCE: client.emotes.HBri,
        HOUSE_BALANCE: client.emotes.HBal,
        EARLY_SUPPORTER: client.emotes.Es,
        EARLY_VERIFIED_BOT_DEVELOPER: client.emotes.Evbd,
        VERIFIED_DEVELOPER: client.emotes.Vd,
    }

    const status = {
        online: client.emotes.online,
        dnd: client.emotes.dnd,
        streaming: client.emotes.streaming,
        idle: client.emotes.idle,
        offline: client.emotes.offline
    }

    const user = message.mentions.members.first() || message.member;
    
    moment.locale("fr");
    
    const infosUser = new MessageEmbed()
    .setColor(client.colors.blue)
    .setTitle(`Infos de ${user.user.tag}`)
    .setThumbnail(user.user.displayAvatarURL({dynamic: true, size: 512}))
    .addField("Nom", `${user.user.username}`)
    .addField("Tag", `${user.user.discriminator}`)
    .addField("ID", `${user.user.id}`)
    .addField("Bot", `${user.user.bot ? "Oui": "Non"}`)
    .addField("Status", `${status[user.presence.status]}`)
    //.addField("Badges", `${badges[user.user.flags.toArray()] === undefined ? "Aucun badge": badges[user.flags.toArray()]}`)
    .addField("Propietaire du serveur", `${message.guild.owner.id === user.user.id ? `${client.emotes.Proprio} Oui`: "Non"}`)
    .addField("Date de création du compte", `${moment(user.user.createdAt).format("dddd Do MMMM YYYY, HH:mm:ss")}`)
    .addField("Date de l'arrivée sur le serveur", `${moment(user.joinedAt).format("dddd Do MMMM YYYY, HH:mm:ss")}`)

    message.channel.send(infosUser)
}

module.exports.help = {
    description: "Sert à voir vos informations ou celle de l'utilisateur mentionné.",
    name: "userinfo",
    aliases: ["ui", "infosuser"],
    category: "utils"
}